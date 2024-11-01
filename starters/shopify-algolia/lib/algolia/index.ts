import { unstable_cache } from "next/cache"

import { env } from "env.mjs"

import { getDemoCategories, getDemoProductReviews, getDemoProducts, getDemoSingleCategory, getDemoSingleProduct, isDemoMode } from "utils/demo-utils"
import { notifyOptIn } from "utils/opt-in"

import { ComparisonOperators, FilterBuilder } from "lib/algolia/filter-builder"
import type { Review } from "lib/reviews/types"
import { PlatformCollection } from "lib/shopify/types"

import { HITS_PER_PAGE } from "constants/index"

import { searchClient as algolia, SortType } from "./client"

import type { CommerceProduct } from "types"
import type { BrowseProps, SearchSingleIndexProps } from "algoliasearch"

export const getProduct = unstable_cache(
  async (handle: string) => {
    if (isDemoMode()) return getDemoSingleProduct(handle)

    const { hits } = await algolia.search<CommerceProduct>({
      indexName: env.ALGOLIA_PRODUCTS_INDEX,
      searchParams: {
        filters: new FilterBuilder().where("handle", handle).build(),
        hitsPerPage: 1,
      },
    })

    return hits.find(Boolean) || null
  },
  ["product-by-handle"],
  { revalidate: 86400 }
)

export const getProducts = unstable_cache(
  async (
    options: SearchSingleIndexProps["searchParams"] = {
      hitsPerPage: 50,
    }
  ) => {
    if (isDemoMode()) return getDemoCategories()

    return await algolia.search<PlatformCollection>({
      indexName: env.ALGOLIA_PRODUCTS_INDEX,
      searchParams: options,
    })
  },
  ["search-products"],
  { revalidate: 86400 }
)

export const getFeaturedProducts = unstable_cache(
  async () => {
    if (isDemoMode()) return getDemoProducts().hits.slice(0, 6)

    const { hits } = await algolia.search<CommerceProduct>({
      indexName: env.ALGOLIA_PRODUCTS_INDEX,
      searchParams: {
        attributesToRetrieve: ["id", "title", "featuredImage", "minPrice", "variants", "avgRating", "totalReviews", "vendor", "handle"],
        hitsPerPage: 6,
      },
    })

    return hits
  },
  ["featured-products"],
  { revalidate: 86400 }
)

export const getAllProducts = async (options?: Omit<BrowseProps["browseParams"], "hitsPerPage">) => {
  if (isDemoMode()) return getDemoProducts()

  return await algolia.getAllResults<CommerceProduct>({
    indexName: env.ALGOLIA_PRODUCTS_INDEX,
    browseParams: {
      ...options,
    },
  })
}

export const getSimilarProducts = unstable_cache(
  async (collection: string | undefined, objectID: string) => {
    const limit = 8

    if (isDemoMode()) return getDemoProducts().hits.slice(0, limit)

    const { results } = await algolia.getRecommendations({
      requests: [
        {
          indexName: env.ALGOLIA_PRODUCTS_INDEX,
          objectID,
          model: "looking-similar",
          maxRecommendations: limit,
          threshold: 60,
        },
      ],
    })

    let collectionSearchResults: { hits: CommerceProduct[] } = { hits: [] }
    if (results[0].hits.length < limit) {
      collectionSearchResults = await algolia.search<CommerceProduct>({
        indexName: env.ALGOLIA_PRODUCTS_INDEX,
        searchParams: {
          hitsPerPage: limit - results[0].hits.length,
          filters: algolia.filterBuilder().where("collections.handle", collection!).build(),
        },
      })
    }

    return [...(results[0].hits as unknown as CommerceProduct[]), ...collectionSearchResults.hits]
  },
  ["product-by-handle"],
  { revalidate: 86400 }
)

export const getNewestProducts = unstable_cache(
  async () => {
    if (isDemoMode()) return getDemoProducts().hits.slice(0, 8)
    const { hits } = await algolia.search<CommerceProduct>({
      indexName: algolia.mapIndexToSort(env.ALGOLIA_PRODUCTS_INDEX, "updatedAtTimestamp:asc"),
      searchParams: {
        hitsPerPage: 8,
      },
    })

    return hits
  },
  ["newest-products"],
  { revalidate: 86400 }
)

export const getCollection = unstable_cache(
  async (slug: string) => {
    if (isDemoMode()) return getDemoSingleCategory(slug)

    const results = await algolia.search<PlatformCollection>({
      indexName: env.ALGOLIA_CATEGORIES_INDEX,
      searchParams: {
        filters: algolia.filterBuilder().where("handle", slug).build(),
        hitsPerPage: 1,
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

    if (!env.ALGOLIA_REVIEWS_INDEX) {
      notifyOptIn({ feature: "reviews", source: "product.actions.ts" })
      return { reviews: [], total: 0 }
    }

    const { hits, nbHits } = await algolia.search<Review>({
      indexName: env.ALGOLIA_REVIEWS_INDEX,
      searchParams: {
        filters: algolia.filterBuilder().where("product_handle", handle).and().where("published", "true").and().where("hidden", "false").build(),
        hitsPerPage: limit,
        page,
        attributesToRetrieve: ["body", "rating", "verified", "reviewer", "published", "created_at", "hidden", "featured"],
      },
    })

    return { reviews: hits.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()), total: nbHits || 0 }
  },
  ["product-reviews-by-handle"],
  { revalidate: 86400 }
)

export const getAllReviews = async (options: Omit<BrowseProps["browseParams"], "hitsPerPage"> = {}) => {
  if (isDemoMode()) return getDemoProductReviews()

  if (!env.ALGOLIA_REVIEWS_INDEX) {
    notifyOptIn({ feature: "reviews", source: "product.actions.ts" })
    return { reviews: [], total: 0 }
  }

  const { hits, totalPages } = await algolia.getAllResults<Review>({
    indexName: env.ALGOLIA_REVIEWS_INDEX,
    browseParams: {
      ...options,
    },
  })

  return { reviews: hits.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()), totalPages }
}

export const updateProducts = async (products: Partial<CommerceProduct>[]) => {
  if (isDemoMode()) return

  return algolia.update({
    indexName: env.ALGOLIA_PRODUCTS_INDEX,
    objects: products.filter(Boolean),
  })
}

export const updateReviews = async (reviews: Review[]) => {
  if (isDemoMode() || !env.ALGOLIA_REVIEWS_INDEX) return

  return algolia.update({
    indexName: env.ALGOLIA_REVIEWS_INDEX,
    objects: reviews,
  })
}

export const getCategories = unstable_cache(
  async (
    options: SearchSingleIndexProps["searchParams"] = {
      hitsPerPage: 50,
    }
  ) => {
    if (isDemoMode()) return getDemoCategories()

    return await algolia.search<PlatformCollection>({
      indexName: env.ALGOLIA_CATEGORIES_INDEX,
      searchParams: options,
    })
  },
  ["search-categories"],
  { revalidate: 86400 }
)

export const updateCategories = unstable_cache(
  async (categories: PlatformCollection[]) => {
    if (isDemoMode()) return

    return algolia.update({
      indexName: env.ALGOLIA_CATEGORIES_INDEX,
      objects: categories.filter(Boolean) as unknown as Record<string, unknown>[],
    })
  },
  ["update-categories"],
  { revalidate: 86400 }
)

export const deleteCategories = async (ids: string[]) => {
  if (isDemoMode()) return

  return algolia.delete({
    indexName: env.ALGOLIA_CATEGORIES_INDEX,
    objectIDs: ids,
  })
}

export const deleteProducts = async (ids: string[]) => {
  if (isDemoMode()) return

  return algolia.delete({
    indexName: env.ALGOLIA_PRODUCTS_INDEX,
    objectIDs: ids,
  })
}

export const getFilteredProducts = unstable_cache(
  async (query: string, sortBy: string, page: number, filters: string) => {
    if (isDemoMode()) return getDemoProducts()
    const indexName = algolia.mapIndexToSort(env.ALGOLIA_PRODUCTS_INDEX, sortBy as SortType)

    try {
      // use a single http request to search for products and facets, utilize separate query for facet values that should be independent from the search query
      const res = await algolia?.multiSearch<CommerceProduct>({
        requests: [
          {
            indexName,
            query,
            facets: ["hierarchicalCategories.lvl0", "hierarchicalCategories.lvl1", "hierarchicalCategories.lvl2"],
            hitsPerPage: HITS_PER_PAGE,
          },
          {
            indexName,
            hitsPerPage: HITS_PER_PAGE,
            facets: ["vendor", "variants.availableForSale", "flatOptions.Color", "minPrice", "avgRating"].concat(
              !!env.SHOPIFY_HIERARCHICAL_NAV_HANDLE ? [`hierarchicalCategories.lvl0`, `hierarchicalCategories.lvl1`, `hierarchicalCategories.lvl2`] : []
            ),
            filters,
            page: page - 1,
            attributesToRetrieve: ["id", "handle", "title", "priceRange", "featuredImage", "minPrice", "variants", "images", "avgRating", "totalReviews", "vendor"],
          },
        ],
      })

      const [independentFacets, results] = res?.results || []

      const hits = results?.hits || []
      const totalPages = results?.nbPages || 0
      const facetDistribution = results?.facets || {}
      const totalHits = results.nbHits || 0
      const independentFacetDistribution = independentFacets.facets || {}

      return { hits, totalPages, facetDistribution, totalHits, independentFacetDistribution }
    } catch (err) {
      console.error(err)
      return { hits: [], totalPages: 0, facetDistribution: {}, totalHits: 0, independentFacetDistribution: {} }
    }
  },
  ["filtered-products"],
  { revalidate: 86400 }
)
