import { Suspense } from "react"
import { createSearchParamsCache, parseAsArrayOf, parseAsInteger, parseAsString } from "nuqs/server"

import type { PlatformCollection } from "lib/shopify/types"
import { getCategories, getFilteredProducts } from "lib/algolia/rate-limited"

import { buildSearchFilter } from "utils/build-search-filter"

import { FacetsDesktop } from "components/filters/facets-desktop"
import { HitsSection } from "components/filters/hits-section"
import { PaginationSection } from "components/filters/pagination-section"
import { FacetsMobile } from "components/filters/facets-mobile"

import { SearchParamsType } from "types"

import { HIERARCHICAL_SEPARATOR } from "constants/index"
import { cn } from "utils/cn"
import { Sorter } from "./filters/sorter"
import { Breadcrumbs } from "./breadcrumbs"
import { slugToName } from "utils/slug-name"

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

function makeBreadcrumbs(collection?: PlatformCollection) {
  if (collection) {
    return {
      Home: "/",
      [slugToName(collection.handle)]: "",
    }
  }

  // Fallback when no specific collection context is provided
  return {
    Home: "/",
    Search: "/search",
  }
}

export async function SearchView({ searchParams, disabledFacets, collection, basePath }: SearchViewProps) {
  const { q, sortBy, page, ...rest } = searchParamsCache.parse(searchParams)

  const filter = buildSearchFilter({
    collection,
    params: rest,
    separator: HIERARCHICAL_SEPARATOR,
  })

  const hasVendorFilter = rest.vendors && rest.vendors.length > 0
  const { facetDistribution, hits, totalPages, totalHits, independentFacetDistribution } = await getFilteredProducts(
    q,
    sortBy,
    page,
    filter,
    collection?.handle,
    hasVendorFilter
  )

  const { getPageDisplayTypeByHandle } = await import("utils/get-page-display-type")

  const { hits: allCategories } = await getCategories({
    hitsPerPage: 1000,
    attributesToRetrieve: ["handle"],
  })

  const categoryDisplayTypes = allCategories.reduce(
    (acc, category) => {
      acc[category.handle] = getPageDisplayTypeByHandle(category.handle)
      return acc
    },
    {} as Record<string, "CLP" | "PLP">
  )

  return (
    <div className="mx-auto w-full md:max-w-container-md">
            <div className="mb:pb-2 p-4 md:px-0 relative flex w-full items-center justify-center gap-10 md:pt-8">
        <div className="mx-auto w-full">
          <Breadcrumbs items={makeBreadcrumbs(collection)} />
        </div>
      </div>
      <div className="sticky top-[77px] z-40 flex items-center justify-between bg-white/80 p-4 backdrop-blur-lg lg:hidden">
        <div className="flex gap-1 text-2xl font-semibold tracking-tight lg:text-3xl">
          <h1 className="flex-1">{makePageTitle(collection, q)}</h1>
          <span className="mr-auto text-xl lg:text-2xl">({totalHits})</span>
        </div>
        <div className="flex items-center gap-1 lg:hidden">
          <FacetsMobile
            disabledFacets={disabledFacets}
            independentFacetDistribution={independentFacetDistribution as Record<string, Record<string, number>>}
            facetDistribution={facetDistribution as Record<string, Record<string, number>>}
            categoryDisplayTypes={categoryDisplayTypes}
          />
        </div>
      </div>
      <div className={cn("flex gap-12 p-4 md:gap-12", basePath === "ai" ? "ai-2xl:px-0" : "xl:px-0")}>
        <div className="sticky top-[100px] hidden max-h-[90dvh] w-full max-w-64 px-2 lg:block lg:px-0">
          <div className="flex gap-1 font-semibold tracking-tight">
            <h1 className="w-min pb-4 text-3xl lg:text-4xl">{makePageTitle(collection, q)}</h1>
            <span className="text-2xl">({totalHits})</span>
          </div>

          <Suspense>
            <FacetsDesktop
              independentFacetDistribution={independentFacetDistribution as Record<string, Record<string, number>>}
              disabledFacets={disabledFacets}
              className="hidden max-h-[70dvh] shrink-0 basis-[192px] overflow-y-auto lg:block"
              facetDistribution={facetDistribution as Record<string, Record<string, number>>}
              categoryDisplayTypes={categoryDisplayTypes}
            />
          </Suspense>
        </div>
        <div className="w-full">
          <div className="flex justify-end pb-4">
            <Suspense>
              <Sorter className="w-max rounded-md text-sm transition-colors duration-200 hover:bg-gray-100 lg:flex" />
            </Suspense>
          </div>
          <HitsSection hits={hits} basePath={basePath} />
          <PaginationSection queryParams={searchParams} totalPages={totalPages} />
        </div>
      </div>
    </div>
  )
}
