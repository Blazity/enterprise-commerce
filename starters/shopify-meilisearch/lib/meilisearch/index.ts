import { unstable_cache } from "next/cache"
import type { CategoriesDistribution, DocumentsQuery, Facet } from "meilisearch"

import { env } from "env.mjs"

import { getDemoCategories, getDemoProductReviews, getDemoProducts, getDemoSingleCategory, getDemoSingleProduct, isDemoMode } from "utils/demo-utils"
import { notifyOptIn } from "utils/opt-in"

import { ComparisonOperators, FilterBuilder } from "lib/meilisearch/filter-builder"
import type { Review } from "lib/reviews/types"
import { PlatformCollection } from "lib/shopify/types"

import { HITS_PER_PAGE } from "constants/index"

import { searchClient as meilisearch } from "./client"

import type { CommerceProduct } from "types"

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
  { revalidate: 86400 }
)

export const getProducts = unstable_cache(
  async (
    options: DocumentsQuery<PlatformCollection> = {
      limit: 50,
    }
  ) => {
    if (isDemoMode()) return getDemoCategories()

    return await meilisearch.getDocuments<PlatformCollection>({
      indexName: env.MEILISEARCH_PRODUCTS_INDEX,
      options,
    })
  },
  ["search-products"],
  { revalidate: 86400 }
)

export const getFeaturedProducts = unstable_cache(
  async () => {
    if (isDemoMode()) return getDemoProducts().results.slice(0, 6)

    const { results } = await meilisearch.getDocuments<CommerceProduct>({
      indexName: env.MEILISEARCH_FEATURED_PRODUCTS_INDEX,
      options: {
        fields: ["id", "title", "featuredImage", "minPrice", "variants", "avgRating", "totalReviews", "vendor", "handle"],
        limit: 6,
      },
    })

    return results
  },
  ["featured-products"],
  { revalidate: 86400 }
)

export const getAllProducts = async (options?: Omit<DocumentsQuery<CommerceProduct>, "limit">) => {
  if (isDemoMode()) return getDemoProducts()

  return await meilisearch.getDocuments<CommerceProduct>({
    indexName: env.MEILISEARCH_PRODUCTS_INDEX,
    options: {
      ...options,
      limit: 10000,
    },
  })
}

export const getSimilarProducts = unstable_cache(
  async (handle: string, collection: string | undefined) => {
    const limit = 8

    if (isDemoMode()) return getDemoProducts().results.slice(0, limit)

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
  { revalidate: 86400 }
)

export const getNewestProducts = unstable_cache(
  async () => {
    if (isDemoMode()) return getDemoProducts().results.slice(0, 8)

    const results = await meilisearch.searchDocuments<CommerceProduct>({
      indexName: env.MEILISEARCH_PRODUCTS_INDEX,
      options: {
        matchingStrategy: "last",
        limit: 8,
        sort: ["updatedAtTimestamp:desc"],
      },
    })

    return [...results.hits]
  },
  ["newest-products"],
  { revalidate: 86400 }
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
  { revalidate: 86400 }
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
  { revalidate: 86400 }
)

export const getAllReviews = async (options: Omit<DocumentsQuery<Review>, "limit"> = {}) => {
  if (isDemoMode()) return getDemoProductReviews()

  if (!env.MEILISEARCH_REVIEWS_INDEX) {
    notifyOptIn({ feature: "reviews", source: "product.actions.ts" })
    return { reviews: [], total: 0 }
  }

  const { results, total } = await meilisearch.getDocuments<Review>({
    indexName: env.MEILISEARCH_REVIEWS_INDEX,
    options: {
      ...options,
      limit: 10000,
    },
  })

  return { reviews: results.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()), total }
}

export const updateProducts = async (products: Partial<CommerceProduct>[]) => {
  if (isDemoMode()) return

  return meilisearch.updateDocuments({
    indexName: env.MEILISEARCH_PRODUCTS_INDEX,
    documents: products.filter(Boolean),
    options: {
      primaryKey: "id",
    },
  })
}

export const updateReviews = async (reviews: Review[]) => {
  if (isDemoMode() || !env.MEILISEARCH_REVIEWS_INDEX) return

  return meilisearch.updateDocuments({
    indexName: env.MEILISEARCH_REVIEWS_INDEX,
    documents: reviews,
    options: {
      primaryKey: "id",
    },
  })
}

export const getCategories = unstable_cache(
  async (
    options: DocumentsQuery<PlatformCollection> = {
      limit: 50,
    }
  ) => {
    if (isDemoMode()) return getDemoCategories()

    return await meilisearch.getDocuments<PlatformCollection>({
      indexName: env.MEILISEARCH_CATEGORIES_INDEX,
      options,
    })
  },
  ["search-categories"],
  { revalidate: 86400 }
)

export const updateCategories = unstable_cache(
  async (categories: PlatformCollection[]) => {
    if (isDemoMode()) return

    return meilisearch.updateDocuments({
      indexName: env.MEILISEARCH_CATEGORIES_INDEX,
      documents: categories.filter(Boolean),
      options: {
        primaryKey: "id",
      },
    })
  },
  ["update-categories"],
  { revalidate: 86400 }
)

export const deleteCategories = async (ids: string[]) => {
  if (isDemoMode()) return

  return meilisearch.deleteDocuments({
    indexName: env.MEILISEARCH_CATEGORIES_INDEX,
    params: ids,
  })
}

export const deleteProducts = async (ids: string[]) => {
  if (isDemoMode()) return

  return meilisearch.deleteDocuments({
    indexName: env.MEILISEARCH_PRODUCTS_INDEX,
    params: ids,
  })
}

export const getFilteredProducts = unstable_cache(
  async (query: string, sortBy: string, page: number, filter: string) => {
    if (isDemoMode()) return getDemoProducts()

    const response = await meilisearch.multiSearch<CommerceProduct>({
      queries: [
        {
          indexUid: env.MEILISEARCH_PRODUCTS_INDEX,
          q: query,
          facets: ["hierarchicalCategories.lvl0", "hierarchicalCategories.lvl1", "hierarchicalCategories.lvl2"],
        },
        {
          indexUid: env.MEILISEARCH_PRODUCTS_INDEX,
          sort: sortBy ? [sortBy] : undefined,
          limit: HITS_PER_PAGE,
          hitsPerPage: HITS_PER_PAGE,
          facets: ["vendor", "variants.availableForSale", "flatOptions.Color", "minPrice", "avgRating"].concat(
            !!env.SHOPIFY_HIERARCHICAL_NAV_HANDLE ? [`hierarchicalCategories.lvl0`, `hierarchicalCategories.lvl1`, `hierarchicalCategories.lvl2`] : []
          ),
          filter,
          page,
          attributesToRetrieve: ["id", "handle", "title", "priceRange", "featuredImage", "minPrice", "variants", "images", "avgRating", "totalReviews", "vendor"],
        },
      ],
    })

    const [independentFacets, res] = response || []

    const results = res?.hits || []
    const totalPages = res?.totalPages || 0
    const facetDistribution = res?.facetDistribution || {}
    const totalHits = res.totalHits || 0
    const independentFacetDistribution: Record<Facet, CategoriesDistribution> = independentFacets.facetDistribution || {}

    return { results, totalPages, facetDistribution, totalHits, independentFacetDistribution }
  },
  ["filtered-products"],
  { revalidate: 86400 }
)
