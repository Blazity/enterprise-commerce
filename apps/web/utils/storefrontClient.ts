import "server-only"

import { createStorefrontClient } from "@enterprise-commerce/core/platform"
import { env } from "../env.mjs"

export const storefrontClient = createStorefrontClient("shopify", env.SHOPIFY_STORE_DOMAIN, env.SHOPIFY_ADMIN_ACCESS_TOKEN)
