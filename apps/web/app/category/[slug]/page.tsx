import { PlatformProduct } from "@enterprise-commerce/core/platform/types"
import type { Metadata } from "next"
import { unstable_cache } from "next/cache"
import { notFound } from "next/navigation"
import { createSearchParamsCache, parseAsArrayOf, parseAsInteger, parseAsString } from "nuqs/server"
import { Suspense } from "react"
import { meilisearch } from "clients/meilisearch"
import { storefrontClient } from "clients/storefrontClient"

import { MEILISEARCH_INDEX } from "constants/index"
import { ComparisonOperators, FilterBuilder } from "utils/filterBuilder"
import { HeroSection } from "views/Category/HeroSection"
import { PageSkeleton } from "views/Category/PageSkeleton"
import { composeFilters } from "views/Listing/composeFilters"
import { FacetsDesktop } from "views/Listing/FacetsDesktop"
import { FacetsMobile } from "views/Listing/FacetsMobile"
import { HitsSection } from "views/Listing/HitsSection"
import { PaginationSection } from "views/Listing/PaginationSection"
import { Sorter } from "views/Listing/Sorter"
import { getDemoProducts, getDemoSingleCategory, isDemoMode } from "utils/demoUtils"

export const metadata: Metadata = {
  title: "Search | Enterprise Commerce",
  description: "In excepteur elit mollit in.",
}

export const runtime = "edge"

export const revalidate = 3600

const searchParamsCache = createSearchParamsCache({
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
})

interface CategoryPageProps {
  searchParams: Record<string, string | string[] | undefined>
  params: { slug: string }
}

export default async function CategoryPage({ searchParams, params }: CategoryPageProps) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <SearchView searchParams={searchParams} params={params} />
    </Suspense>
  )
}

async function SearchView({ searchParams, params }: CategoryPageProps) {
  const { q, sortBy, page, ...rest } = searchParamsCache.parse(searchParams)
  const collection = isDemoMode() ? getDemoSingleCategory(params.slug) : await storefrontClient.getCollection(params.slug)

  if (!collection) return notFound()

  const filterBuilder = new FilterBuilder().where("collections.title", ComparisonOperators.Equal, collection.title)
  const { facetDistribution, hits, totalPages } = await searchProducts(q, sortBy, page, composeFilters(filterBuilder, rest).build())

  const disabledFacets = ["category", "tags"]

  return (
    <>
      <HeroSection title={collection.title} description={collection.description} image={collection.image} />
      <div className="max-w-container-md mx-auto flex min-h-screen w-full flex-col gap-12 px-4 py-12 md:flex-row md:gap-24 md:py-24 xl:px-0 ">
        <FacetsDesktop disabledFacets={disabledFacets} className="hidden min-w-[250px] max-w-[250px] md:mt-16 lg:block" facetDistribution={facetDistribution} />
        <div className="flex w-full flex-col">
          <div className="mb-6 flex w-full flex-wrap items-center justify-between">
            <div className="flex w-full flex-col gap-2 pb-8">
              <div className="flex items-center justify-between">
                <FacetsMobile disabledFacets={disabledFacets} facetDistribution={facetDistribution} className="block lg:hidden" />
              </div>
              <Sorter className="ml-auto" />
            </div>

            <HitsSection hits={hits} />
            <PaginationSection queryParams={searchParams} totalPages={totalPages} />
          </div>
        </div>
      </div>
    </>
  )
}

const searchProducts = unstable_cache(
  async (query: string, sortBy: string, page: number, filter: string) => {
    if (isDemoMode()) return getDemoProducts()

    const index = await meilisearch?.getIndex<PlatformProduct>(MEILISEARCH_INDEX)

    const results = await index?.search(query, {
      sort: sortBy ? [sortBy] : undefined,
      hitsPerPage: 24,
      facets: ["collections.title", "tags", "vendor", "variants.availableForSale", "flatOptions.Size", "flatOptions.Color", "minPrice"],
      filter,
      page,
      attributesToRetrieve: ["id", "handle", "title", "priceRange", "featuredImage", "minPrice", "variants", "images"],
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
