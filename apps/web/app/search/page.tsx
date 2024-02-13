import { SearchView } from "views/Search/SearchView"

export default function SearchPage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  return <SearchView searchParams={searchParams} />
}
