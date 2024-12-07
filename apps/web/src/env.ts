import { z } from "zod";

const envSchema = z.object({
  S3_REGION: z.string().default(""),
  S3_ENDPOINT: z.string().default(""),
  S3_READ_ONLY_ACCESS_KEY: z.string().default(""),
  S3_READ_ONLY_SECRET_KEY: z.string().default(""),
  S3_ROOT_ACCESS_KEY: z.string().default(""),
  S3_ROOT_SECRET_KEY: z.string().default(""),
  VIDEOS_BUCKET_NAME: z.string().default(""),
  THUMBS_BUCKET_NAME: z.string().default(""),
  THUMBNAIL_BASE_URL: z.string().default(""),
  REDIS_REST_URL: z.string().default(""),
  REDIS_REST_TOKEN: z.string().default(""),
  STRIPE_SECRET_KEY: z.string().default(""),
  STRIPE_SIGNING_SECRET: z.string().default(""),
  PREMIUM_PRODUCT_ID: z.string().default(""),
  PRO_PRODUCT_ID: z.string().default(""),
});

export const env = envSchema.parse(process.env);
