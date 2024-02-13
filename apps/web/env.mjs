import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    SHOPIFY_STOREFRONT_ACCESS_TOKEN: z.string().optional(),
    SHOPIFY_ADMIN_ACCESS_TOKEN: z.string().optional(),
    SHOPIFY_STORE_DOMAIN: z.string().optional(),
    MEILISEARCH_MASTER_KEY: z.string().optional(),
    MEILISEARCH_HOST: z.string().optional(),
    ANALYZE: z
      .enum(["true", "false"])
      .optional()
      .transform((value) => value === "true"),
  },
  client: {},
  runtimeEnv: {
    SHOPIFY_STOREFRONT_ACCESS_TOKEN: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    SHOPIFY_ADMIN_ACCESS_TOKEN: process.env.SHOPIFY_ADMIN_ACCESS_TOKEN,
    SHOPIFY_STORE_DOMAIN: process.env.SHOPIFY_STORE_DOMAIN,
    MEILISEARCH_MASTER_KEY: process.env.MEILISEARCH_MASTER_KEY,
    MEILISEARCH_HOST: process.env.MEILISEARCH_HOST,
    ANALYZE: process.env.ANALYZE,
  },
})
