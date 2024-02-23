import "server-only"

import { createStorefrontClient } from "@enterprise-commerce/core/platform"
import { env } from "../env.mjs"

export const storefrontClient = createStorefrontClient({
  strategy: "shopify",
  storeDomain: env.SHOPIFY_STORE_DOMAIN || "",
  storefrontAccessToken: env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || "",
  adminAccessToken: env.SHOPIFY_ADMIN_ACCESS_TOKEN || "",
})
