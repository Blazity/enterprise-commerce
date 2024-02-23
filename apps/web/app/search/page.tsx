import { createSearchParamsCache, parseAsArrayOf, parseAsInteger, parseAsString } from "nuqs/server"

import { SearchView } from "views/Search/SearchView"

export const runtime = "edge"

// const searchParamsCache = createSearchParamsCache({
//   q: parseAsString.withDefault(""),
//   page: parseAsInteger.withDefault(1),
//   minPrice: parseAsInteger,
//   maxPrice: parseAsInteger,
//   sortBy: parseAsString.withDefault(""),
//   categories: parseAsArrayOf(parseAsString).withDefault([]),
//   vendors: parseAsArrayOf(parseAsString).withDefault([]),
//   tags: parseAsArrayOf(parseAsString).withDefault([]),
//   colors: parseAsArrayOf(parseAsString).withDefault([]),
//   sizes: parseAsArrayOf(parseAsString).withDefault([]),
// })

export default function SearchPage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  return <SearchView searchParams={searchParams} />
}
