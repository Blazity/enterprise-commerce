import { createEnv } from "@t3-oss/env-core"
import { z } from "zod"

export const env = createEnv({
  server: {
    SHOPIFY_ADMIN_ACCESS_TOKEN: z.string(),
    SHOPIFY_STORE_DOMAIN: z.string(),
    SEEDER_ENABLED: z.literal("true").or(z.literal("false")),
  },
  clientPrefix: "PUBLIC_",
  client: {},
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
})
