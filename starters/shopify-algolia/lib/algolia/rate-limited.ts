/**
 * Rate-limited versions of Algolia functions for SSR contexts
 * 
 * These functions are used when data is fetched on-demand (SSR)
 * and should be rate-limited. For SSG/ISR contexts, use the 
 * regular functions from lib/algolia/index.ts
 */

import { unstable_cache } from "next/cache"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { checkRateLimit } from "@vercel/firewall"

import { env } from "env.mjs"
import { searchClient as algolia } from "./client"
import { FilterBuilder } from "./filter-builder"
import { HITS_PER_PAGE } from "constants/index"

import { getDemoCategories, getDemoProductReviews, getDemoProducts, getDemoSingleCategory, getDemoSingleProduct, isDemoMode } from "utils/demo-utils"
import { notifyOptIn } from "utils/opt-in"

import type { CommerceProduct } from "types"
import type { PlatformCollection } from "lib/shopify/types"
import type { Review } from "lib/reviews/types"
import type { BrowseProps, SearchSingleIndexProps } from "algoliasearch"

// Rate limit keys configured in Vercel WAF dashboard
type RateLimitKey = 
  | "algolia-product-browse"
  | "algolia-product-details" 
  | "algolia-product-search"
  | "algolia-category-browse"
  | "algolia-reviews-fetch"
  | "algolia-similar-products"
  | "algolia-facet-values"

/**
 * Check rate limit and redirect to 429 page if limited
 */
async function checkAlgoliaRateLimit(key: RateLimitKey) {
  // Skip rate limiting in development without VERCEL_FIREWALL_DEV_HOST
  if (process.env.NODE_ENV === 'development' && !process.env.VERCEL_FIREWALL_DEV_HOST) {
    return
  }

  try {
    const headerData = await headers()
    
    const result = await checkRateLimit(key, { 
      headers: headerData,
      firewallHostForDevelopment: process.env.VERCEL_FIREWALL_DEV_HOST
    })
    
    if (result.rateLimited) {
      redirect("/429")
    }
  } catch (error) {
    // Log error but don't block the request
    console.error(`Rate limit check failed for key ${key}:`, error)
  }
}

// Cached version of getProduct
const getProductCached = unstable_cache(
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
  ["rl-product-by-handle"],
  { revalidate: 86400, tags: ["products"] }
)

export const getProduct = async (handle: string) => {
  await checkAlgoliaRateLimit("algolia-product-details")
  return getProductCached(handle)
}

// Cached version of getProducts
const getProductsCached = unstable_cache(
  async (
    options: SearchSingleIndexProps["searchParams"] = {
      hitsPerPage: 50,
    }
  ) => {
    if (isDemoMode()) return getDemoProducts()

    return await algolia.search<PlatformCollection>({
      indexName: env.ALGOLIA_PRODUCTS_INDEX,
      searchParams: options,
    })
  },
  ["rl-search-products"],
  { revalidate: 86400, tags: ["products"] }
)

export const getProducts = async (
  options: SearchSingleIndexProps["searchParams"] = {
    hitsPerPage: 50,
  }
) => {
  await checkAlgoliaRateLimit("algolia-product-browse")
  return getProductsCached(options)
}

// Cached version of searchProducts
const searchProductsCached = unstable_cache(
  async (query: string, options: SearchSingleIndexProps["searchParams"] = {}) => {
    if (isDemoMode()) return getDemoProducts()

    return await algolia.search<CommerceProduct>({
      indexName: env.ALGOLIA_PRODUCTS_INDEX,
      searchParams: {
        query,
        ...options,
      },
    })
  },
  ["rl-search-products-query"],
  { revalidate: 3600, tags: ["search"] }
)

export const searchProducts = async (query: string, options: SearchSingleIndexProps["searchParams"] = {}) => {
  await checkAlgoliaRateLimit("algolia-product-search")
  return searchProductsCached(query, options)
}

// Cached version of getCategories
const getCategoriesCached = unstable_cache(
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
  ["rl-search-categories"],
  { revalidate: 86400, tags: ["categories"] }
)

export const getCategories = async (
  options: SearchSingleIndexProps["searchParams"] = {
    hitsPerPage: 50,
  }
) => {
  await checkAlgoliaRateLimit("algolia-category-browse")
  return getCategoriesCached(options)
}

// Cached version of getCollection
const getCollectionCached = unstable_cache(
  async (slug: string) => {
    if (isDemoMode()) return getDemoSingleCategory(slug)

    const results = await algolia.search<PlatformCollection>({
      indexName: env.ALGOLIA_CATEGORIES_INDEX,
      searchParams: {
        filters: algolia.filterBuilder().where("handle", slug).build(),
        hitsPerPage: 1,
        attributesToRetrieve: ["handle", "title", "seo", "descriptionHtml", "image", "pageDisplayTypeMetafield"],
      },
    })

    return results.hits.find(Boolean) || null
  },
  ["rl-category-by-handle"],
  { revalidate: 86400, tags: ["categories"] }
)

export const getCollection = async (slug: string) => {
  await checkAlgoliaRateLimit("algolia-category-browse")
  return getCollectionCached(slug)
}

// Cached version of getProductReviews
const getProductReviewsCached = unstable_cache(
  async (handle: string, { page = 0, limit = 10 } = { page: 0, limit: 10 }) => {
    if (isDemoMode()) return getDemoProductReviews()

    if (!env.ALGOLIA_REVIEWS_INDEX) {
      notifyOptIn({ feature: "reviews", source: "rate-limited.ts" })
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

    return {
      reviews: hits.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
      total: nbHits || 0,
    }
  },
  ["rl-product-reviews-by-handle"],
  { revalidate: 86400, tags: ["reviews"] }
)

export const getProductReviews = async (handle: string, options = { page: 0, limit: 10 }) => {
  await checkAlgoliaRateLimit("algolia-reviews-fetch")
  return getProductReviewsCached(handle, options)
}

// Cached version of getSimilarProducts
const getSimilarProductsCached = unstable_cache(
  async (collection: string | undefined, objectID: string) => {
    const limit = 8
    if (!collection) return []

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
          filters: algolia.filterBuilder().where("collections.handle", collection).build(),
        },
      })
    }

    return [...(results[0].hits as unknown as CommerceProduct[]), ...collectionSearchResults.hits]
  },
  ["rl-similar-products"],
  { revalidate: 86400, tags: ["products", "recommendations"] }
)

export const getSimilarProducts = async (collection: string | undefined, objectID: string) => {
  await checkAlgoliaRateLimit("algolia-similar-products")
  return getSimilarProductsCached(collection, objectID)
}

// Cached version of getFilteredProducts
const getFilteredProductsCached = unstable_cache(
  async (query: string, sortBy: string, page: number, filters: string, collectionHandle?: string, hasVendorFilter: boolean = false) => {
    if (isDemoMode()) return getDemoProducts()
    
    const indexName = algolia.mapIndexToSort(env.ALGOLIA_PRODUCTS_INDEX, sortBy as any)

    try {
      const queries = [
        algolia.search<CommerceProduct>({
          indexName,
          searchParams: {
            query,
            filters,
            page: page - 1,
            hitsPerPage: HITS_PER_PAGE,
            attributesToRetrieve: ["id", "handle", "title", "priceRange", "featuredImage", "minPrice", "variants", "images", "avgRating", "totalReviews"],
            facets: ["flatOptions.Color", "avgRating", "vendor", "minPrice", "variants.availableForSale"],
            maxValuesPerFacet: 1000,
          },
        }),
        algolia.search<CommerceProduct>({
          indexName,
          searchParams: {
            facets: ["vendor"].concat(env.SHOPIFY_HIERARCHICAL_NAV_HANDLE ? ["hierarchicalCategories.lvl0", "hierarchicalCategories.lvl1", "hierarchicalCategories.lvl2"] : []),
            hitsPerPage: HITS_PER_PAGE,
            maxValuesPerFacet: 1000,
          },
        }),
      ]

      // Add vendor-specific query only when vendor filter is active in category context
      if (hasVendorFilter && collectionHandle) {
        const filtersWithoutVendor = filters
          .split(" AND ")
          .filter(f => !f.includes('vendor:'))
          .join(" AND ")
        
        queries.push(
          algolia.search<CommerceProduct>({
            indexName,
            searchParams: {
              facets: ["vendor"],
              hitsPerPage: 0,
              filters: filtersWithoutVendor,
              maxValuesPerFacet: 1000,
            },
          })
        )
      }

      const allResults = await Promise.all(queries)
      const [results, independentFacets, vendorFacetsWithoutFilter] = allResults

      const hits = results?.hits || []
      const totalPages = results?.nbPages || 0
      const facetDistribution = results?.facets || {}
      const totalHits = results.nbHits || 0
      
      let vendorFacets
      if (hasVendorFilter && collectionHandle && vendorFacetsWithoutFilter) {
        vendorFacets = vendorFacetsWithoutFilter.facets?.vendor
      } else if (collectionHandle) {
        vendorFacets = facetDistribution.vendor
      } else {
        vendorFacets = independentFacets.facets?.vendor
      }
      
      const independentFacetDistribution = {
        ...independentFacets.facets,
        vendor: vendorFacets || {}
      }

      return {
        hits,
        totalPages,
        facetDistribution,
        totalHits,
        independentFacetDistribution,
      }
    } catch (err) {
      console.error(err)
      return {
        hits: [],
        totalPages: 0,
        facetDistribution: {},
        totalHits: 0,
        independentFacetDistribution: {},
      }
    }
  },
  ["rl-filtered-products"],
  { revalidate: 86400, tags: ["search", "products"] } 
)

export const getFilteredProducts = async (
  query: string, 
  sortBy: string, 
  page: number, 
  filters: string, 
  collectionHandle?: string, 
  hasVendorFilter: boolean = false
) => {
  await checkAlgoliaRateLimit("algolia-product-browse")
  return getFilteredProductsCached(query, sortBy, page, filters, collectionHandle, hasVendorFilter)
}

// Cached version of getFacetValues
const getFacetValuesCached = unstable_cache(
  async ({ indexName, facetName }: { indexName: string; facetName: string }) => {
    if (isDemoMode()) return []

    const res = await algolia.getFacetValues({
      indexName,
      facetName,
    })

    return res?.facetHits.map(({ value }) => value)
  },
  ["rl-facet-values"],
  { revalidate: 86400, tags: ["facets"] }
)

export const getFacetValues = async ({ indexName, facetName }: { indexName: string; facetName: string }) => {
  await checkAlgoliaRateLimit("algolia-facet-values")
  return getFacetValuesCached({ indexName, facetName })
}