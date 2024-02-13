import { SearchView } from "views/Search/SearchView"

export const runtime = "edge"

export default function SearchPage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  return <SearchView searchParams={searchParams} />
}
