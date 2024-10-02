import "server-only"

import { createShopifyClient } from "lib/shopify"
import { env } from "../env.mjs"

export const storefrontClient = createShopifyClient({
  storeDomain: env.SHOPIFY_STORE_DOMAIN || "",
  storefrontAccessToken: env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || "",
  adminAccessToken: env.SHOPIFY_ADMIN_ACCESS_TOKEN || "",
})
