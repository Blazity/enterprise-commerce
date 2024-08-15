import { Suspense } from "react"
import type { PlatformCollection } from "@enterprise-commerce/core/platform/types"
import { unstable_cache } from "next/cache"
import { createSearchParamsCache, parseAsArrayOf, parseAsInteger, parseAsString } from "nuqs/server"
import { meilisearch } from "clients/meilisearch"

import { ComparisonOperators, FilterBuilder } from "utils/filterBuilder"
import { composeFilters } from "views/Listing/composeFilters"
import { FacetsDesktop } from "views/Listing/FacetsDesktop"
import { HitsSection } from "views/Listing/HitsSection"
import { PaginationSection } from "views/Listing/PaginationSection"
import { SearchFacet } from "views/Listing/SearchFacet"
import { getDemoProducts, isDemoMode } from "utils/demoUtils"
import { env } from "env.mjs"
import { CommerceProduct, SearchParamsType } from "types"
import { HIERARCHICAL_SEPARATOR, HITS_PER_PAGE } from "constants/index"
import { Controls } from "views/Listing/Controls"

interface SearchViewProps {
  searchParams: SearchParamsType
  params?: { slug: string; page?: string }
  collection?: PlatformCollection
  disabledFacets?: string[]
}

export const searchParamsCache = createSearchParamsCache({
  q: parseAsString.withDefault(""),
  page: parseAsInteger.withDefault(1),
  minPrice: parseAsInteger,
  maxPrice: parseAsInteger,
  sortBy: parseAsString.withDefault(""),
  categories: parseAsArrayOf(parseAsString).withDefault([]),
  vendors: parseAsArrayOf(parseAsString).withDefault([]),
  colors: parseAsArrayOf(parseAsString).withDefault([]),
  rating: parseAsInteger,
})

export async function SearchView({ searchParams, disabledFacets, collection }: SearchViewProps) {
  const { q, sortBy, page, ...rest } = searchParamsCache.parse(searchParams)

  const filterBuilder = new FilterBuilder()

  if (collection) {
    filterBuilder.where("collections.handle", ComparisonOperators.Equal, collection.handle)
  }

  const { facetDistribution, hits, totalPages, totalHits, independentFacetDistribution } = await searchProducts(
    q,
    sortBy,
    page,
    composeFilters(filterBuilder, rest, HIERARCHICAL_SEPARATOR).build()
  )

  return (
    <div className="max-w-container-md mx-auto w-full px-4 py-12 md:py-24 xl:px-0">
      <div className="flex gap-12 md:gap-24">
        <Suspense>
          <FacetsDesktop
            independentFacetDistribution={independentFacetDistribution}
            disabledFacets={disabledFacets}
            className="hidden shrink-0  basis-[250px] lg:block"
            facetDistribution={facetDistribution}
          />
        </Suspense>
        <div className="w-full">
          <Controls disabledFacets={disabledFacets} independentFacetDistribution={independentFacetDistribution} facetDistribution={facetDistribution} totalHits={totalHits} />
          <Suspense>
            <SearchFacet className="mb-6" />
          </Suspense>
          <HitsSection hits={hits} />
          <PaginationSection queryParams={searchParams} totalPages={totalPages} />
        </div>
      </div>
    </div>
  )
}

const searchProducts = unstable_cache(
  async (query: string, sortBy: string, page: number, filter: string) => {
    if (isDemoMode()) return getDemoProducts()

    try {
      const index = await meilisearch?.getIndex<CommerceProduct>(env.MEILISEARCH_PRODUCTS_INDEX)

      if (!index) {
        console.warn({ message: "Missing products index", source: "SearchView" })
      }

      // use a single http request to search for products and facets, utilize separate query for facet values that should be independent from the search query
      const res = await meilisearch?.multiSearch<CommerceProduct>({
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
            attributesToRetrieve: ["id", "handle", "title", "priceRange", "featuredImage", "minPrice", "variants", "images", "avgRating", "totalReviews"],
          },
        ],
      })

      const [independentFacets, results] = res?.results || []

      const hits = results?.hits || []
      const totalPages = results?.totalPages || 0
      const facetDistribution = results?.facetDistribution || {}
      const totalHits = results.totalHits || 0
      const independentFacetDistribution = independentFacets.facetDistribution || {}

      return { hits, totalPages, facetDistribution, totalHits, independentFacetDistribution }
    } catch (err) {
      return { hits: [], totalPages: 0, facetDistribution: {}, totalHits: 0, independentFacetDistribution: {} }
    }
  },
  ["products-search"],
  { revalidate: 3600 }
)
