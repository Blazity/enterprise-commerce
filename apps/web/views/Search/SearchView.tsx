import { meilisearch } from "clients/meilisearch"
import { Button } from "components/Button"
import Link from "next/link"

import { createSearchParamsCache, parseAsArrayOf, parseAsInteger, parseAsString } from "nuqs/server"
import { ComparisonOperators, FilterBuilder, SpecialOperators } from "utils/filter-builder"
import { Facets } from "./Facets"
import { PaginationSection } from "./Pagination"
import { SearchBar } from "./SearchBar"
import { Sorter } from "./Sorter"

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

export async function SearchView({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const parsedSearchParams = searchParamsCache.parse(searchParams)

  const index = await meilisearch?.getIndex("products")

  const filter = new FilterBuilder()

  if (parsedSearchParams.categories.length > 0) {
    filter.and().group((sub) => {
      sub.in("collections.title", parsedSearchParams.categories)
    })
  }

  if (parsedSearchParams.vendors.length > 0) {
    filter.and().group((sub) => {
      sub.in("vendor", parsedSearchParams.vendors)
    })
  }

  if (parsedSearchParams.tags.length > 0) {
    filter.and().group((sub) => {
      sub.in("tags", parsedSearchParams.tags)
    })
  }

  if (parsedSearchParams.colors.length > 0) {
    filter.and().group((sub) => {
      sub.in("flatOptions.Color", parsedSearchParams.colors)
    })
  }

  if (parsedSearchParams.sizes.length > 0) {
    filter.and().group((sub) => {
      sub.in("flatOptions.Size", parsedSearchParams.sizes)
    })
  }

  if (parsedSearchParams.minPrice) {
    filter.and().where("minPrice", ComparisonOperators.GreaterThan, parsedSearchParams.minPrice)
  }

  if (parsedSearchParams.maxPrice) {
    filter.and().where("minPrice", ComparisonOperators.LessThan, parsedSearchParams.maxPrice)
  }

  const meilisearchResults = await index.search(parsedSearchParams.q, {
    sort: parsedSearchParams.sortBy ? [parsedSearchParams.sortBy] : undefined,
    hitsPerPage: 25,
    facets: ["collections.title", "tags", "vendor", "variants.availableForSale", "flatOptions.Size", "flatOptions.Color", "minPrice"],
    filter: filter.build(),
    page: parsedSearchParams.page,
  })

  const hits = meilisearchResults.hits

  const totalPages = meilisearchResults.totalPages
  const availableForSale = meilisearchResults.facetDistribution?.["variants.availableForSale"]

  return (
    <div className="container mx-auto px-4 py-6 md:px-6 lg:px-8">
      <div className="grid gap-6 md:grid-cols-[240px_1fr]">
        <div>
          <h2 className="mb-4 text-lg font-semibold">Filters</h2>
          <SearchBar />
          <Facets facetDistribution={meilisearchResults.facetDistribution} />
        </div>
        <div>
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Products</h1>
            <Sorter />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {hits.map((singleResult) => (
              <div className="group relative overflow-hidden rounded-lg" key={singleResult.id}>
                <Link className="absolute inset-0 z-10" href={`/products/${singleResult.handle}`}>
                  <span className="sr-only">View</span>
                </Link>
                <img
                  alt="Product 1"
                  className="h-60 w-full object-cover"
                  height={singleResult.images[0].height || 300}
                  src={singleResult.images[0].url}
                  style={{
                    aspectRatio: "400/300",
                    objectFit: "cover",
                  }}
                  width={singleResult.images[0].width || 400}
                />
                <div className="bg-white p-4 dark:bg-gray-950">
                  <h3 className="text-lg font-semibold md:text-xl">{singleResult.title}</h3>
                  <h4 className="text-base font-semibold md:text-lg">${singleResult.minPrice || 1337}</h4>
                  <Button className="mt-2">Add to Cart</Button>
                </div>
              </div>
            ))}
          </div>

          {/* <label>Available for sales ({console.log(availableForSale)})</label>
          <input type="checkbox" name="availableForSale" /> */}
          {/* </> */}
          {/* )}
          /> */}

          <PaginationSection totalPages={totalPages} />
        </div>
      </div>
    </div>
  )
}

function ArrowUpDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21 16-4 4-4-4" />
      <path d="M17 20V4" />
      <path d="m3 8 4-4 4 4" />
      <path d="M7 4v16" />
    </svg>
  )
}
