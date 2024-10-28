import "server-only"

import { unstable_cache } from "next/cache"
import { createShopifyClient } from "lib/shopify"
import { env } from "../env.mjs"

export const storefrontClient = createShopifyClient({
  storeDomain: env.SHOPIFY_STORE_DOMAIN || "",
  storefrontAccessToken: env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || "",
  adminAccessToken: env.SHOPIFY_ADMIN_ACCESS_TOKEN || "",
})

export const getPage = unstable_cache(async (handle: string) => await storefrontClient.getPage(handle), ["page"], { revalidate: 3600 })

export const getAllPages = unstable_cache(async () => await storefrontClient.getAllPages(), ["page"], { revalidate: 3600 })
