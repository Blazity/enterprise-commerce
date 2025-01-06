import { Suspense } from "react"
import { createSearchParamsCache, parseAsArrayOf, parseAsInteger, parseAsString } from "nuqs/server"

import type { PlatformCollection } from "lib/shopify/types"
import { getFilteredProducts } from "lib/algolia"

import { buildSearchFilter } from "utils/build-search-filter"

import { FacetsDesktop } from "components/filters/facets-desktop"
import { HitsSection } from "components/filters/hits-section"
import { PaginationSection } from "components/filters/pagination-section"
// import { Controls } from "components/filters/controls"
import { FacetsMobile } from "components/filters/facets-mobile"

import { SearchParamsType } from "types"

import { HIERARCHICAL_SEPARATOR } from "constants/index"

interface SearchViewProps {
  searchParams: SearchParamsType
  params?: { slug: string; page?: string }
  collection?: PlatformCollection
  disabledFacets?: string[]
  basePath?: string
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

export async function SearchView({ searchParams, disabledFacets, collection, basePath }: SearchViewProps) {
  const { q, sortBy, page, ...rest } = searchParamsCache.parse(searchParams)

  const filter = buildSearchFilter({
    collection,
    params: rest,
    separator: HIERARCHICAL_SEPARATOR,
  })

  const { facetDistribution, hits, totalPages, totalHits, independentFacetDistribution } = await getFilteredProducts(q, sortBy, page, filter)

  return (
    <div className="mx-auto w-full md:max-w-container-md">
      {/* <div className="sticky top-[77px] z-40 flex items-center justify-between bg-white/80 py-4 backdrop-blur-lg md:top-[83px] md:-mx-12 md:px-12">
        <h1 className="flex items-center gap-1 text-3xl font-semibold tracking-tight lg:text-4xl">
          {makePageTitle(collection, q)}
          <span className="hidden lg:block">({totalHits})</span>
        </h1>
        <Controls />
      </div> */}
      <hr className="lg:hidden" />
      <div className="sticky top-[77px] z-40 flex items-center justify-between bg-white/80 p-4 py-4 backdrop-blur-lg lg:hidden">
        <div className="flex items-center gap-2">
          <h1 className="flex items-center gap-1 text-3xl font-semibold tracking-tight lg:text-4xl">
            {makePageTitle(collection, q)}
            <span className="">({totalHits})</span>
          </h1>
          {/* <span className="text-gray-500">{totalHits} results</span> */}
        </div>
        <FacetsMobile
          disabledFacets={disabledFacets}
          independentFacetDistribution={independentFacetDistribution as Record<string, Record<string, number>>}
          facetDistribution={facetDistribution as Record<string, Record<string, number>>}
          className="lg:hidden"
        />
      </div>
      <div className="flex gap-12 p-4 md:gap-12 xl:px-0">
        <div className="sticky top-[100px] hidden max-h-[80dvh] max-w-64 px-2 lg:block lg:px-0">
          <h1 className="flex items-center gap-1 pb-4 text-3xl font-semibold tracking-tight lg:text-4xl">
            {makePageTitle(collection, q)}
            <span className="">({totalHits})</span>
          </h1>
          <Suspense>
            <FacetsDesktop
              independentFacetDistribution={independentFacetDistribution as Record<string, Record<string, number>>}
              disabledFacets={disabledFacets}
              className="hidden max-h-[80dvh] shrink-0 basis-[192px] overflow-y-auto lg:block"
              facetDistribution={facetDistribution as Record<string, Record<string, number>>}
            />
          </Suspense>
        </div>
        <div className="w-full">
          <div className="px-4"></div>
          <HitsSection hits={hits} basePath={basePath} />
          <PaginationSection queryParams={searchParams} totalPages={totalPages} />
        </div>
      </div>
    </div>
  )
}
