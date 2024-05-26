import type { CommerceProduct } from "types"

export function getDemoProducts() {
  if (!isDemoMode()) return { hits: [], totalPages: 0, facetDistribution: {}, totalHits: 0 }

  const allProducts = require("public/demo-data.json") as { results: CommerceProduct[]; offset: number; limit: number; total: number }

  return {
    hits: allProducts.results,
    totalPages: 1,
    facetDistribution: {},
    totalHits: allProducts.results.length,
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

export function isDemoMode(): boolean {
  const {
    SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    SHOPIFY_ADMIN_ACCESS_TOKEN,
    SHOPIFY_APP_API_SECRET_KEY,
    SHOPIFY_STORE_DOMAIN,
    MEILISEARCH_HOST,
    MEILISEARCH_MASTER_KEY,
    LIVE_URL,
    IS_DEMO_MODE,
  } = process.env

  return (
    isDemoValue(SHOPIFY_STOREFRONT_ACCESS_TOKEN) ||
    isDemoValue(SHOPIFY_ADMIN_ACCESS_TOKEN) ||
    isDemoValue(SHOPIFY_APP_API_SECRET_KEY) ||
    isDemoValue(SHOPIFY_STORE_DOMAIN) ||
    isDemoValue(MEILISEARCH_HOST) ||
    isDemoValue(MEILISEARCH_MASTER_KEY) ||
    !LIVE_URL ||
    IS_DEMO_MODE === "true"
  )
}

function isDemoValue(value: string | undefined) {
  return !value || value === "demo"
}
