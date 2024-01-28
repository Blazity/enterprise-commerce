import { createShopifyClient } from "./shopify"

type Strategy = "shopify"

export function createStorefrontClient(strategy: Strategy, storeDomain: string, accessToken: string) {
  switch (strategy) {
    case "shopify":
      return createShopifyClient({ storeDomain, accessToken })
    default:
      throw new Error("Unknown strategy used for creating storefront client")
  }
}
