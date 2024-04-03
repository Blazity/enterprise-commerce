import { PlatformProduct } from "@enterprise-commerce/core/platform/types"
import { env } from "env.mjs"

export function getDemoProducts() {
  if (!isDemoMode()) return { hits: [], totalPages: 0, facetDistribution: {}, totalHits: 0 }

  const allProducts = require("public/demo-data.json") as { results: PlatformProduct[]; offset: number; limit: number; total: number }

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
  return getDemoProducts().hits.flatMap((p) => p.collections)
}

export function getDemoSingleCategory(handle: string) {
  return getDemoCategories().find((c) => c.handle === handle) || null
}

export function isDemoMode() {
  return (
    !process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN ||
    !process.env.SHOPIFY_ADMIN_ACCESS_TOKEN ||
    !process.env.SHOPIFY_APP_API_SECRET_KEY ||
    !process.env.SHOPIFY_STORE_DOMAIN ||
    !process.env.MEILISEARCH_HOST ||
    !process.env.MEILISEARCH_MASTER_KEY ||
    !process.env.LIVE_URL ||
    env.IS_DEMO_MODE === "true"
  )
}
