import { type ReactNode, Suspense } from "react"
import type { PlatformCollection } from "@enterprise-commerce/core/platform/types"
import { unstable_cache } from "next/cache"
import { createSearchParamsCache, parseAsArrayOf, parseAsInteger, parseAsString } from "nuqs/server"
import { meilisearch } from "clients/meilisearch"

import { ComparisonOperators, FilterBuilder } from "utils/filterBuilder"
import { composeFilters } from "views/Listing/composeFilters"
import { FacetsDesktop } from "views/Listing/FacetsDesktop"
import { FacetsMobile } from "views/Listing/FacetsMobile"
import { HitsSection } from "views/Listing/HitsSection"
import { PaginationSection } from "views/Listing/PaginationSection"
import { SearchFacet } from "views/Listing/SearchFacet"
import { Sorter } from "views/Listing/Sorter"
import { getDemoProducts, isDemoMode } from "utils/demoUtils"
import { env } from "env.mjs"
import { CommerceProduct, SearchParamsType } from "types"

interface SearchViewProps {
  searchParams: SearchParamsType
  params?: { slug: string; page?: string }
  collection?: PlatformCollection
  disabledFacets?: string[]
  intro?: ReactNode
}

export const searchParamsCache = createSearchParamsCache({
  q: parseAsString.withDefault(""),
  page: parseAsInteger.withDefault(1),
  minPrice: parseAsInteger,
  maxPrice: parseAsInteger,
  sortBy: parseAsString.withDefault(""),
  categories: parseAsArrayOf(parseAsString).withDefault([]),
  vendors: parseAsArrayOf(parseAsString).withDefault([]),
  tags: parseAsArrayOf(parseAsString).withDefault([]),
  colors: parseAsArrayOf(parseAsString).withDefault([]),
  sizes: parseAsArrayOf(parseAsString).withDefault([]),
  rating: parseAsInteger,
})

export async function SearchView({ searchParams, disabledFacets, intro, collection }: SearchViewProps) {
  const { q, sortBy, page, ...rest } = searchParamsCache.parse(searchParams)

  const filterBuilder = new FilterBuilder()

  if (collection) {
    filterBuilder.where("collections.handle", ComparisonOperators.Equal, collection.handle)
  }

  const { facetDistribution, hits, totalPages } = await searchProducts(q, sortBy, page, composeFilters(filterBuilder, rest).build())

  return (
    <div className="max-w-container-md mx-auto w-full px-4 py-12 md:py-24 xl:px-0">
      {intro}
      <div className="flex min-h-screen w-full flex-col gap-12 md:flex-row md:gap-24">
        <FacetsDesktop disabledFacets={disabledFacets} className="hidden min-w-[250px] max-w-[250px] md:mt-16 lg:block" facetDistribution={facetDistribution} />
        <div className="flex w-full flex-col">
          <div className="mb-6 flex w-full flex-wrap items-center justify-between">
            <div className="flex w-full gap-2 pb-8">
              <div className="flex items-center justify-between gap-4">
                <FacetsMobile disabledFacets={disabledFacets} facetDistribution={facetDistribution} className="block lg:hidden" />
              </div>
              <Suspense>
                <SearchFacet className="grow" />
              </Suspense>
              {/*  has to be wrapped w. suspense, nuqs is using useSearchParams in useQueryState
               * https://github.com/47ng/nuqs/issues/496
               */}
              <Suspense>
                <Sorter className="ml-auto hidden shrink-0 basis-[200px] self-center lg:block" />
              </Suspense>
            </div>

            <HitsSection hits={hits} />
            <PaginationSection queryParams={searchParams} totalPages={totalPages} />
          </div>
        </div>
      </div>
    </div>
  )
}

const searchProducts = unstable_cache(
  async (query: string, sortBy: string, page: number, filter: string) => {
    if (isDemoMode()) return getDemoProducts()

    const index = await meilisearch?.getIndex<CommerceProduct>(env.MEILISEARCH_PRODUCTS_INDEX)

    if (!index) {
      console.warn({ message: "Missing products index", source: "SearchView" })
    }

    const results = await index?.search(query, {
      sort: sortBy ? [sortBy] : undefined,
      hitsPerPage: 24,
      facets: ["collections.handle", "collections.title", "tags", "vendor", "variants.availableForSale", "flatOptions.Size", "flatOptions.Color", "minPrice", "avgRating"],
      filter,
      page,
      attributesToRetrieve: ["id", "handle", "title", "priceRange", "featuredImage", "minPrice", "variants", "images", "avgRating", "totalReviews"],
    })

    const hits = results?.hits || []
    const totalPages = results?.totalPages || 0
    const facetDistribution = results?.facetDistribution || {}
    const totalHits = results.totalHits

    return { hits, totalPages, facetDistribution, totalHits }
  },
  ["products-search"],
  { revalidate: 3600 }
)
