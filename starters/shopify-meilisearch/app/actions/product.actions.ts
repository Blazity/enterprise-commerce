"use server"

import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache"
import { env } from "env.mjs"

import { meilisearch } from "clients/search"
import type { Review } from "lib/reviews/types"

import { ComparisonOperators, FilterBuilder } from "lib/meilisearch/filter-builder"
import { getDemoProductReviews, getDemoSingleProduct, isDemoMode } from "utils/demo-utils"
import type { CommerceProduct } from "types"
import { notifyOptIn } from "utils/opt-in"

export const searchProducts = async (query: string, limit: number = 4) => {
  "use cache"
  cacheTag(`search-products-${query}`)
  cacheLife("days")

  if (isDemoMode())
    return {
      hits: [],
      hasMore: false,
    }

  const { hits, estimatedTotalHits } = await meilisearch.searchDocuments<CommerceProduct>({
    indexName: env.MEILISEARCH_PRODUCTS_INDEX,
    query,
    options: {
      limit,
      attributesToRetrieve: ["id", "handle", "title", "featuredImage", "images", "variants"],
    },
  })

  return { hits, hasMore: estimatedTotalHits > limit }
}

export const getProduct = async (handle: string) => {
  "use cache"
  cacheTag(`product-${handle}`)
  cacheLife("days")

  if (isDemoMode()) return getDemoSingleProduct(handle)

  const { results } = await meilisearch.getDocuments<CommerceProduct>({
    indexName: env.MEILISEARCH_PRODUCTS_INDEX,
    options: {
      filter: new FilterBuilder().where("handle", ComparisonOperators.Equal, handle).build(),
      limit: 1,
    },
  })

  return results.find(Boolean) || null
}

export const getProductReviews = async (handle: string, { page = 1, limit = 10 } = { page: 1, limit: 10 }) => {
  "use cache"
  cacheTag(`product-reviews-${handle}`)
  cacheLife("days")

  if (isDemoMode()) return getDemoProductReviews()

  if (!env.MEILISEARCH_REVIEWS_INDEX) {
    notifyOptIn({ feature: "reviews", source: "product.actions.ts" })
    return { reviews: [], total: 0 }
  }

  const { results, total } = await meilisearch.getDocuments<Review>({
    indexName: env.MEILISEARCH_REVIEWS_INDEX,
    options: {
      filter: new FilterBuilder()
        .where("product_handle", ComparisonOperators.Equal, handle)
        .and()
        .where("published", ComparisonOperators.Equal, "true")
        .and()
        .where("hidden", ComparisonOperators.Equal, "false")
        .build(),
      limit,
      offset: (page - 1) * limit,
      fields: ["body", "rating", "verified", "reviewer", "published", "created_at", "hidden", "featured"],
    },
  })

  return { reviews: results.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()), total }
}
