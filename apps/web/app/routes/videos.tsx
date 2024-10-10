import type { LoaderFunctionArgs, MetaFunction } from "@vercel/remix";
import { getAuth } from "@clerk/remix/ssr.server";
import { redirect } from "@remix-run/node";
import { Await, Link, useLoaderData } from "@remix-run/react";
import { Upload } from "lucide-react";
import { Button } from "~/components/ui/button";
import { db, desc, videos } from "db";
import { Suspense } from "react";
import TopNav from "~/components/TopNav";
import { Separator } from "~/components/ui/separator";
import { Skeleton } from "~/components/ui/skeleton";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { defer } from "@vercel/remix";
import { DeleteVideoDialog } from "~/components/delete-video-dialog";
import { EditVideoDialog } from "~/components/edit-video-dialog";
import { VideosBoard } from "~/components/videos-board";
import { humanFileSize, HumanFileSizeMotion } from "~/lib/utils";
import { Footer } from "~/components/Footer";
import { PLAN_STORAGE_SIZES } from "cms";
import { useSetAtom } from "jotai";
import { isUploadDialogOpenAtom } from "~/atoms";
import { UploadVideoDialogContainer } from "~/components/upload-video-dialog";
import { UploadingVideosContainer } from "~/components/uploading-videos-container";
import { FullPageDropzone } from "~/components/full-page-dropzone";

export const meta: MetaFunction = () => {
  return [
    {
      title: "Your Videos | Flowble",
    },
  ];
};

export async function loader(args: LoaderFunctionArgs) {
  const { userId } = await getAuth(args);

  if (userId === null) {
    return redirect("/sign-up");
  }

  const userData = db.query.users
    .findFirst({
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
            smallThumbnailUrl: true,
            videoLengthSeconds: true,
            isProcessing: true,
            createdAt: true,
          },
        },
      },
    })
    .execute();

  return defer({
    userData,
  });
}

function VideosDashboard() {
  const { userData } = useLoaderData<typeof loader>();

  const setIsUploadDialogOpen = useSetAtom(isUploadDialogOpenAtom);

  return (
    <>
      <FullPageDropzone />
      <UploadVideoDialogContainer />
      <DeleteVideoDialog />
      <EditVideoDialog />
      <div className="min-h-screen flex flex-col">
        <TopNav />
        <main className="grow container space-y-8 mx-auto px-4 py-8">
          <div className="flex gap-2 items-center justify-between">
            <h1 className="text-2xl w-64 font-bold">Your Videos</h1>
            <div className="flex flex-col-reverse md:flex-row items-center md:gap-8">
              <Suspense>
                <Await resolve={userData}>
                  {(userData) => (
                    <StorageUsedText
                      maxStorage={PLAN_STORAGE_SIZES[userData.accountTier]}
                      totalStorageUsed={userData.totalStorageUsed}
                    />
                  )}
                </Await>
              </Suspense>
              <Button
                onMouseDown={() => setIsUploadDialogOpen(true)}
                variant="ghost"
                className="relative inline-flex h-12 overflow-hidden rounded-md p-[1px] focus:outline-none focus:ring-2 hover:ring-2 focus:ring-offset-2"
              >
                <span className="absolute inset-[-1000%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="text-lg inline-flex h-full w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-background px-3 py-1 font-medium text-primary backdrop-blur-3xl">
                  <Upload /> Upload a Video
                </span>
              </Button>
            </div>
          </div>
          <Separator />
          <div className="container flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <UploadingVideosContainer />
              <Suspense fallback={<Skeleton className="rounded-lg w-full aspect-video" />}>
                <Await resolve={userData}>
                  {({ videos }) => <VideosBoard videos={videos as any} />}
                </Await>
              </Suspense>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

type StorageUsedTextProps = {
  totalStorageUsed: number;
  maxStorage: number;
};

function StorageUsedText({ maxStorage, totalStorageUsed }: StorageUsedTextProps) {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["totalStorageUsed"],
    initialData: totalStorageUsed,
  });

  queryClient.setQueryData(["totalStorageAvailable"], maxStorage);

  return (
    <Link to="/pricing">
      <Button variant="ghost" className="h-12 text-md">
        Storage used: <HumanFileSizeMotion size={data} /> / {humanFileSize(maxStorage)}
      </Button>
    </Link>
  );
}

export default VideosDashboard;
