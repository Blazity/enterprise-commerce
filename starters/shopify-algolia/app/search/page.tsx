import type { Metadata } from "next"
import { Suspense } from "react"
import type { SearchParamsType } from "types"
import { PageSkeleton } from "views/Category/PageSkeleton"
import { SearchView } from "views/Search/SearchView"

export const metadata: Metadata = {
  title: "Search | Enterprise Commerce",
  description: "In excepteur elit mollit in.",
}

export const revalidate = 86400

export const runtime = "nodejs"

interface SearchPageProps {
  searchParams: SearchParamsType
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <SearchView searchParams={searchParams} />
    </Suspense>
  )
}
