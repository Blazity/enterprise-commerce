import { Review } from "lib/reviews/types"
import { PlatformCollection } from "lib/shopify/types"
import type { CommerceProduct } from "types"

export function getDemoProducts() {
  if (!isDemoMode()) return { hits: [], totalPages: 0, facetDistribution: {}, totalHits: 0, independentFacetDistribution: {} }

  const allProducts = require("public/demo-data.json") as { hits: CommerceProduct[]; offset: number; limit: number; total: number }

  return {
    hits: allProducts.hits,
    totalPages: 1,
    facetDistribution: {},
    totalHits: allProducts.hits.length,
    independentFacetDistribution: {},
  }
}

export function getDemoSingleProduct(handle: string) {
  return getDemoProducts().hits.find((p) => p.handle === handle) || null
}

export function getDemoCategories() {
  return require("public/demo-categories-data.json") as PlatformCollection[]
}

export function getDemoSingleCategory(handle: string) {
  return getDemoCategories().find((c: { handle: string }) => c.handle === handle) || null
}

export function getDemoProductReviews() {
  return require("public/demo-product-reviews-data.json") as { reviews: Review[]; total: number }
}

export function isDemoMode(): boolean {
  return (
    isDemoValue(process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN) ||
    isDemoValue(process.env.SHOPIFY_ADMIN_ACCESS_TOKEN) ||
    isDemoValue(process.env.SHOPIFY_APP_API_SECRET_KEY) ||
    isDemoValue(process.env.SHOPIFY_STORE_DOMAIN) ||
    isDemoValue(process.env.ALGOLIA_APP_ID) ||
    isDemoValue(process.env.ALGOLIA_WRITE_API_KEY) ||
    isDemoValue(process.env.ALGOLIA_CATEGORIES_INDEX) ||
    isDemoValue(process.env.ALGOLIA_PRODUCTS_INDEX) ||
    !process.env.LIVE_URL ||
    process.env.IS_DEMO_MODE === "true"
  )
}

function isDemoValue(value: string | undefined) {
  return !value || value === "demo"
}
