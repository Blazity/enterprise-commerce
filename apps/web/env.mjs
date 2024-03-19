import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  skipValidation: process.env.NODE_ENV !== "production" || process.env.SKIP_ENV_VALIDATION === "true",
  server: {
    SHOPIFY_STOREFRONT_ACCESS_TOKEN: z.string().default("demo"),
    SHOPIFY_ADMIN_ACCESS_TOKEN: z.string().optional(),
    SHOPIFY_APP_API_KEY: z.string().optional(),
    SHOPIFY_STORE_DOMAIN: z.string().default("demo"),
    MEILISEARCH_MASTER_KEY: z.string().optional().default("demo"),
    MEILISEARCH_HOST: z.string().optional().default("demo"),
    REPLICATE_API_KEY: z.string().optional(),
    LIVE_URL: z.string().optional().default("https://enterprise-commerce-web.vercel.app"),
    ANALYZE: z
      .enum(["true", "false"])
      .optional()
      .transform((value) => value === "true"),
  },
  client: {},
  runtimeEnv: {
    SHOPIFY_STOREFRONT_ACCESS_TOKEN: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    SHOPIFY_ADMIN_ACCESS_TOKEN: process.env.SHOPIFY_ADMIN_ACCESS_TOKEN,
    SHOPIFY_APP_API_KEY: process.env.SHOPIFY_APP_API_KEY,
    SHOPIFY_STORE_DOMAIN: process.env.SHOPIFY_STORE_DOMAIN,
    MEILISEARCH_MASTER_KEY: process.env.MEILISEARCH_MASTER_KEY,
    MEILISEARCH_HOST: process.env.MEILISEARCH_HOST,
    LIVE_URL: process.env.LIVE_URL,
    ANALYZE: process.env.ANALYZE,
    REPLICATE_API_KEY: process.env.REPLICATE_API_KEY,
  },
})
