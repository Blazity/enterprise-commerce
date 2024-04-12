import type { Metadata } from "next"
import { SearchView } from "views/Search/SearchView"

export const metadata: Metadata = {
  title: "Search | Enterprise Commerce",
  description: "In excepteur elit mollit in.",
}

export const runtime = "edge"

export const revalidate = 3600

interface SearchPageProps {
  searchParams: Record<string, string | string[] | undefined>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  return <SearchView searchParams={searchParams} />
}
