import { unstable_cache } from "next/cache"

import { env } from "env.mjs"

import { getDemoProductReviews, getDemoProducts, getDemoSingleCategory, getDemoSingleProduct, isDemoMode } from "utils/demo-utils"
import { notifyOptIn } from "utils/opt-in"

import { meilisearch as searchClient } from "lib/meilisearch"
import { ComparisonOperators, FilterBuilder } from "lib/meilisearch/filter-builder"

import type { Review } from "lib/reviews/types"

import type { CommerceProduct } from "types"
import { PlatformCollection } from "lib/shopify/types"

export const meilisearch: ReturnType<typeof searchClient> = searchClient({
  host: env.MEILISEARCH_HOST || "",
  adminApiKey: env.MEILISEARCH_ADMIN_KEY || "",
})

export const getProduct = unstable_cache(
  async (handle: string) => {
    if (isDemoMode()) return getDemoSingleProduct(handle)

    const { results } = await meilisearch.getDocuments<CommerceProduct>({
      indexName: env.MEILISEARCH_PRODUCTS_INDEX,
      options: {
        filter: new FilterBuilder().where("handle", ComparisonOperators.Equal, handle).build(),
        limit: 1,
      },
    })

    return results.find(Boolean) || null
  },
  ["product-by-handle"],
  { revalidate: 3600 }
)

export const getProductReviews = unstable_cache(
  async (handle: string, { page = 1, limit = 10 } = { page: 1, limit: 10 }) => {
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
  },
  ["product-reviews-by-handle"],
  { revalidate: 3600 }
)

export const getCollection = unstable_cache(
  async (slug: string) => {
    if (isDemoMode()) return getDemoSingleCategory(slug)

    const results = await meilisearch.searchDocuments<PlatformCollection>({
      indexName: env.MEILISEARCH_CATEGORIES_INDEX,
      options: {
        filter: new FilterBuilder().where("handle", ComparisonOperators.Equal, slug).build(),
        limit: 1,
        attributesToRetrieve: ["handle", "title", "seo"],
      },
    })

    return results.hits.find(Boolean) || null
  },
  ["category-by-handle"],
  { revalidate: 3600 }
)

export const getSimilarProducts = unstable_cache(
  async (handle: string, collection: string | undefined) => {
    const limit = 8

    if (isDemoMode()) return getDemoProducts().hits.slice(0, limit)

    const similarSearchResults = await meilisearch.searchDocuments<CommerceProduct>({
      indexName: env.MEILISEARCH_PRODUCTS_INDEX,
      query: handle,
      options: {
        matchingStrategy: "last",
        limit,
        hybrid: { semanticRatio: 1 },
      },
    })

    let collectionSearchResults: { hits: CommerceProduct[] } = { hits: [] }
    if (similarSearchResults.hits.length < limit) {
      collectionSearchResults = await meilisearch.searchDocuments<CommerceProduct>({
        indexName: env.MEILISEARCH_PRODUCTS_INDEX,
        options: {
          matchingStrategy: "last",
          limit: limit - similarSearchResults.hits.length,
          filter: new FilterBuilder().where("collections.handle", ComparisonOperators.Equal, collection).build(),
        },
      })
    }

    return [...similarSearchResults.hits, ...collectionSearchResults.hits]
  },
  ["product-by-handle"],
  { revalidate: 3600 }
)
