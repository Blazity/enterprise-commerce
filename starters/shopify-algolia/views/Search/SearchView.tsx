import { Suspense } from "react"
import type { PlatformCollection } from "lib/shopify/types"
import { unstable_cache } from "next/cache"
import { createSearchParamsCache, parseAsArrayOf, parseAsInteger, parseAsString } from "nuqs/server"
import { algolia } from "clients/search"

import { FilterBuilder } from "lib/algolia/filterBuilder"
import { composeFilters } from "views/Listing/composeFilters"
import { FacetsDesktop } from "views/Listing/FacetsDesktop"
import { HitsSection } from "views/Listing/HitsSection"
import { PaginationSection } from "views/Listing/PaginationSection"
import { getDemoProducts, isDemoMode } from "utils/demoUtils"
import { env } from "env.mjs"
import { CommerceProduct, SearchParamsType } from "types"
import { HIERARCHICAL_SEPARATOR, HITS_PER_PAGE } from "constants/index"
import { Controls } from "views/Listing/Controls"
import { FacetsMobile } from "views/Listing/FacetsMobile"

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

function makePageTitle(collection: PlatformCollection | undefined, query: string) {
  if (!!collection) {
    return `${collection.title}`
  }

  if (!!query.length) {
    return `${query}`
  }

  return "Search"
}

export async function SearchView({ searchParams, disabledFacets, collection }: SearchViewProps) {
  const { q, sortBy, page, ...rest } = searchParamsCache.parse(searchParams)

  const filterBuilder = new FilterBuilder()

  if (collection) {
    filterBuilder.where("collections.handle", collection.handle)
  }

  const { facetDistribution, hits, totalPages, totalHits, independentFacetDistribution } = await searchProducts(
    q,
    sortBy,
    page,
    composeFilters(filterBuilder, rest, HIERARCHICAL_SEPARATOR).build()
  )

  return (
    <div className="mx-auto w-full max-w-[1920px] p-4 md:px-12 md:pb-24 md:pt-4">
      <div className="sticky top-[77px] z-40 flex items-center justify-between bg-white py-4 md:top-[84px] md:-mx-12 md:px-12">
        <h1 className="flex items-center gap-1 text-2xl font-normal">
          {makePageTitle(collection, q)}
          <span className="hidden lg:block">({totalHits})</span>
        </h1>
        <Controls />
      </div>
      <hr className="lg:hidden" />
      <div className="sticky top-[141px] z-40 flex items-center justify-between bg-white p-2 py-4 lg:hidden">
        <span className="text-gray-500">{totalHits} results</span>
        <FacetsMobile disabledFacets={disabledFacets} independentFacetDistribution={independentFacetDistribution} facetDistribution={facetDistribution} className="lg:hidden" />
      </div>
      <div className="flex gap-12 md:gap-24">
        <Suspense>
          <FacetsDesktop
            independentFacetDistribution={independentFacetDistribution}
            disabledFacets={disabledFacets}
            className="sticky top-[156px] hidden max-h-[70dvh] shrink-0 basis-[192px] overflow-y-auto lg:block"
            facetDistribution={facetDistribution}
          />
        </Suspense>
        <div className="w-full">
          <div className="px-4"></div>
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
      // use a single http request to search for products and facets, utilize separate query for facet values that should be independent from the search query
      const res = await algolia?.multiSearch<CommerceProduct>({
        requests: [
          {
            indexName: env.ALGOLIA_PRODUCTS_INDEX,
            query,
            facets: ["hierarchicalCategories.lvl0", "hierarchicalCategories.lvl1", "hierarchicalCategories.lvl2"],
            hitsPerPage: HITS_PER_PAGE,
          },
          //@TODO: Implement sort
          {
            indexName: env.ALGOLIA_PRODUCTS_INDEX,
            hitsPerPage: HITS_PER_PAGE,
            facets: ["vendor", "variants.availableForSale", "flatOptions.Color", "minPrice", "avgRating"].concat(
              !!env.SHOPIFY_HIERARCHICAL_NAV_HANDLE ? [`hierarchicalCategories.lvl0`, `hierarchicalCategories.lvl1`, `hierarchicalCategories.lvl2`] : []
            ),
            filters: filter,
            page,
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
      return { hits: [], totalPages: 0, facetDistribution: {}, totalHits: 0, independentFacetDistribution: {} }
    }
  },
  ["products-search"],
  { revalidate: 3600 }
)
