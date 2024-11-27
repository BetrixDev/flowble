import { relations } from "drizzle-orm";
import {
  bigint,
  boolean,
  index,
  integer,
  jsonb,
  pgTable,
  real,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: text("id").primaryKey(),
    polarCustomerId: text("polar_customer_id"),
    email: text("email").notNull(),
    createdAt: timestamp("created_at", { withTimezone: false }).notNull().defaultNow(),
    accountTier: text("account_tier", { enum: ["free", "pro", "premium", "ultimate"] })
      .notNull()
      .default("free"),
    totalStorageUsed: real("total_storage_used").notNull().default(0),
  },
  (table) => ({
    userId_idx: index("userId_idx").on(table.id),
    email_idx: index("email_idx").on(table.email),
    polarCustomerId_idx: index("polarCustomerId_idx").on(table.polarCustomerId),
  }),
);

export const usersRelations = relations(users, ({ many }) => ({
  videos: many(videos),
}));

export const videos = pgTable(
  "videos",
  {
    id: text("id").primaryKey(),
    authorId: text("author_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    title: text("title").notNull(),
    nativeFileKey: text("native_file_key").notNull(),
    smallThumbnailKey: text("small_thumbnail_key"),
    largeThumbnailKey: text("large_thumbnail_key"),
    createdAt: timestamp("created_at", { withTimezone: false }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: false }).notNull().defaultNow(),
    deletionDate: timestamp("deletion_date", { withTimezone: false }),
    isPrivate: boolean("is_private").notNull().default(false),
    views: bigint("views", { mode: "number" }).notNull().default(0),
    fileSizeBytes: real("file_size_bytes").notNull(),
    videoLengthSeconds: integer("video_length_seconds"),
    isProcessing: boolean("is_processing").notNull().default(true),
    sources: jsonb("sources")
      .$type<
        {
          key: string;
          type: string;
          width?: number;
          height?: number;
          bitrate?: number;
          isNative: boolean;
        }[]
      >()
      .notNull()
      .default([]),
  },
  (table) => ({
    authorId_idx: index("authorId_idx").on(table.authorId),
    videoId_idx: index("videoId_idx").on(table.id),
    createdAt_idx: index("createdAt_idx").on(table.createdAt),
    deletionDate_idx: index("deletionDate_idx").on(table.deletionDate),
  }),
);

export const videosRelations = relations(videos, ({ one }) => ({
  author: one(users, {
    fields: [videos.authorId],
    references: [users.id],
  }),
}));
