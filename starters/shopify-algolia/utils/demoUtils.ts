import type { CommerceProduct } from "types"

export function getDemoProducts() {
  if (!isDemoMode()) return { hits: [], totalPages: 0, facetDistribution: {}, totalHits: 0, independentFacetDistribution: {} }

  const allProducts = require("public/demo-data.json") as { results: CommerceProduct[]; offset: number; limit: number; total: number }

  return {
    hits: allProducts.results,
    totalPages: 1,
    facetDistribution: {},
    totalHits: allProducts.results.length,
    independentFacetDistribution: {},
  }
}

export function getDemoSingleProduct(handle: string) {
  return getDemoProducts().hits.find((p) => p.handle === handle) || null
}

export function getDemoCategories() {
  return require("public/demo-categories-data.json")
}

export function getDemoSingleCategory(handle: string) {
  return getDemoCategories().find((c) => c.handle === handle) || null
}

export function getDemoProductReviews() {
  return require("public/demo-product-reviews-data.json")
}

export function isDemoMode(): boolean {
  return (
    isDemoValue(process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN) ||
    isDemoValue(process.env.SHOPIFY_ADMIN_ACCESS_TOKEN) ||
    isDemoValue(process.env.SHOPIFY_APP_API_SECRET_KEY) ||
    isDemoValue(process.env.SHOPIFY_STORE_DOMAIN) ||
    isDemoValue(process.env.MEILISEARCH_HOST) ||
    isDemoValue(process.env.MEILISEARCH_ADMIN_KEY) ||
    isDemoValue(process.env.MEILISEARCH_CATEGORIES_INDEX) ||
    isDemoValue(process.env.MEILISEARCH_PRODUCTS_INDEX) ||
    !process.env.LIVE_URL ||
    process.env.IS_DEMO_MODE === "true"
  )
}

function isDemoValue(value: string | undefined) {
  return !value || value === "demo"
}
