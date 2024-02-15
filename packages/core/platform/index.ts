import { createShopifyClient } from "./shopify"

type Strategy = "shopify"

interface CreateStorefrontClientProps {
  strategy: Strategy
  storeDomain: string
  storefrontAccessToken?: string
  adminAccessToken?: string
}

export function createStorefrontClient({ storefrontAccessToken, adminAccessToken, storeDomain, strategy }: CreateStorefrontClientProps) {
  switch (strategy) {
    case "shopify":
      return createShopifyClient({ storeDomain, storefrontAccessToken, adminAccessToken })
    default:
      throw new Error("Unknown strategy used for creating storefront client")
  }
}
