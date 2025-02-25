import { Suspense } from "react"
import { createSearchParamsCache, parseAsArrayOf, parseAsInteger, parseAsString } from "nuqs/server"

import type { PlatformCollection } from "lib/shopify/types"
import { ComparisonOperators, FilterBuilder } from "lib/meilisearch/filter-builder"
import { getFilteredProducts } from "lib/meilisearch"

import { composeFilters } from "utils/compose-filters"

import { FacetsDesktop } from "components/filters/facets-desktop"
import { HitsSection } from "components/filters/hits-section"
import { PaginationSection } from "components/filters/pagination-section"
import { Controls } from "components/filters/controls"
import { FacetsMobile } from "components/filters/facets-mobile"

import { SearchParamsType } from "types"

import { HIERARCHICAL_SEPARATOR } from "constants/index"

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
    filterBuilder.where("collections.handle", ComparisonOperators.Equal, collection.handle)
  }

  const {
    facetDistribution,
    results: hits,
    totalPages,
    totalHits,
    independentFacetDistribution,
  } = await getFilteredProducts(q, sortBy, page, composeFilters(filterBuilder, rest, HIERARCHICAL_SEPARATOR).build())

  return (
    <div className="mx-auto w-full max-w-[1920px] p-4 md:px-12 md:pb-24 md:pt-4">
      <div className="sticky top-[77px] z-40 flex items-center justify-between bg-white py-4 md:top-[83px] md:-mx-12 md:px-12">
        <h1 className="flex items-center gap-1 text-3xl font-semibold tracking-tight lg:text-4xl">
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
