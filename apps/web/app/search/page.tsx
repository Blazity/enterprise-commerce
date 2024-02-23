import { PlatformProduct } from "@enterprise-commerce/core/platform/types"
import { meilisearch } from "clients/meilisearch"
import { unstable_cache } from "next/cache"
import { createSearchParamsCache, parseAsArrayOf, parseAsInteger, parseAsString } from "nuqs/server"

import { FacetsSection } from "views/Search/FacetsSection"
import { HitsSection } from "views/Search/HitsSection"
import { PaginationSection } from "views/Search/PaginationSection"
import { Sorter } from "views/Search/Sorter"
import { composeFilters } from "views/Search/composeFilters"

export const runtime = "edge"

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

export default async function SearchPage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const parsedSearchParams = searchParamsCache.parse(searchParams)
  const index = await meilisearch?.getIndex("products")

  const meilisearchResults = await searchProducts(parsedSearchParams)

  // Skeleton
  if (!meilisearchResults) return <></>

  const hits = meilisearchResults.hits
  const totalPages = meilisearchResults.totalPages
  // const availableForSale = meilisearchResults.facetDistribution?.["variants.availableForSale"]

  return (
    <div className="container mx-auto px-4 py-6 md:px-6 lg:px-8">
      <div className="grid gap-6 md:grid-cols-[240px_1fr]">
        <FacetsSection facetDistribution={meilisearchResults.facetDistribution} />
        <div>
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Products</h1>
            <Sorter />
          </div>

          <HitsSection hits={hits} />
          <PaginationSection totalPages={totalPages} />
        </div>
      </div>
    </div>
  )
}

const searchProducts = unstable_cache(
  async (parsedSearchParams: ReturnType<typeof searchParamsCache.all>) => {
    const index = await meilisearch?.getIndex<PlatformProduct>("products")

    if (!index) return null

    const results = await index.search(parsedSearchParams.q, {
      sort: parsedSearchParams.sortBy ? [parsedSearchParams.sortBy] : undefined,
      hitsPerPage: 25,
      facets: ["collections.title", "tags", "vendor", "variants.availableForSale", "flatOptions.Size", "flatOptions.Color", "minPrice"],
      filter: composeFilters(parsedSearchParams).build(),
      page: parsedSearchParams.page,
    })

    return results
  },
  ["products-search"],
  { revalidate: 3600 }
)
