import "server-only";

import { MAX_FILE_SIZE_FREE_TIER, PLAN_STORAGE_SIZES } from "@/lib/constants";
import { db } from "@/lib/db";
import { env } from "@/lib/env";
import { videos } from "@/lib/schema";
import { safeParseAccountTier } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { Redis } from "@upstash/redis";
import { waitUntil } from "@vercel/functions";
import { desc } from "drizzle-orm";
import { redirect } from "next/navigation";

const redis = new Redis({
  url: env.REDIS_REST_URL,
  token: env.REDIS_REST_TOKEN,
});

export async function fetchVideosData() {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  const cacheKey = `videos:${userId}`;

  const cachedData = await redis.hgetall<{
    accountTier: string;
    totalStorageUsed: number;
    videos: {
      fileSizeBytes: number;
      views: number;
      title: string;
      id: string;
      isPrivate: boolean;
      videoLengthSeconds: number;
      createdAt: string;
      isProcessing: boolean;
      smallThumbnailKey: string;
      deletionDate: string | null;
    }[];
  }>(cacheKey);

  let userData: {
    accountTier: "free" | "pro" | "premium" | "ultimate";
    totalStorageUsed: number;
    videos: {
      fileSizeBytes: number;
      views: number;
      title: string;
      id: string;
      isPrivate: boolean;
      videoLengthSeconds: number | null;
      createdAt: Date;
      smallThumbnailKey: string | null;
      deletionDate: Date | null;
      isProcessing: boolean;
    }[];
  };

  if (!cachedData) {
    userData = await getFreshVideoData(userId);

    waitUntil(
      redis.hset(cacheKey, userData).then(() => {
        redis.expire(cacheKey, 86400);
      }),
    );
  } else {
    userData = {
      accountTier: safeParseAccountTier(cachedData.accountTier),
      totalStorageUsed: cachedData.totalStorageUsed,
      videos: cachedData.videos.map((v) => ({
        ...v,
        createdAt: new Date(v.createdAt),
        deletionDate: v.deletionDate ? new Date(v.deletionDate) : null,
      })),
    };
  }

  const serverVideos = userData.videos.map((video) => ({
    ...video,
    createdAt: video.createdAt.toString(),
    deletionDate: video.deletionDate?.toString() ?? null,
    smallThumbnailUrl: `${env.THUMBNAIL_BASE_URL}/${video.smallThumbnailKey}`,
  }));

  const userMaxStorage = PLAN_STORAGE_SIZES[userData.accountTier];
  const maxFileUpload = userData.accountTier === "free" ? MAX_FILE_SIZE_FREE_TIER : undefined;

  return {
    serverVideos,
    userMaxStorage,
    maxFileUpload,
    totalStorageUsed: userData.totalStorageUsed,
  };
}

async function getFreshVideoData(userId: string) {
  const userData = await db.query.users.findFirst({
    where: (table, { eq }) => eq(table.id, userId),
    columns: {
      accountTier: true,
      totalStorageUsed: true,
    },
    with: {
      videos: {
        orderBy: desc(videos.createdAt),
        columns: {
          fileSizeBytes: true,
          views: true,
          title: true,
          id: true,
          isPrivate: true,
          videoLengthSeconds: true,
          isProcessing: true,
          createdAt: true,
          smallThumbnailKey: true,
          deletionDate: true,
        },
      },
    },
  });

  if (!userData) {
    return redirect("/");
  }

  return userData;
}
