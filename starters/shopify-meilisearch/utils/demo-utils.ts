import { Review } from "lib/reviews/types"
import type { PlatformCollection } from "lib/shopify/types"
import type { CategoriesDistribution, Facet } from "meilisearch"
import type { CommerceProduct } from "types"

export function getDemoProducts(): {
  results: CommerceProduct[]
  totalPages: number
  facetDistribution: Record<Facet, CategoriesDistribution>
  totalHits: number
  independentFacetDistribution: Record<Facet, CategoriesDistribution>
} {
  const allProducts = require("public/demo-data.json")
  return {
    results: allProducts.results,
    totalPages: 1,
    facetDistribution: {},
    totalHits: allProducts.results.length,
    independentFacetDistribution: {},
  }
}

export function getDemoSingleProduct(handle: string) {
  return getDemoProducts()?.results?.find((p) => p.handle === handle) || null
}

export function getDemoCategories() {
  const allCategories = require("public/demo-categories-data.json") as PlatformCollection[]

  return {
    results: allCategories,
    totalPages: 1,
    facetDistribution: {},
    totalHits: allCategories.length,
    independentFacetDistribution: {},
  }
}

export function getDemoSingleCategory(handle: string) {
  return getDemoCategories().results.find((c: { handle: string }) => c.handle === handle) || null
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
