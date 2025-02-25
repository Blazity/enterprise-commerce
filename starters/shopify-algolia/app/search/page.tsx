import type { Metadata } from "next"
import { Suspense } from "react"
import type { SearchParamsType } from "types"
import { PageSkeleton } from "app/category/_components/page-skeleton"
import { SearchView } from "components/search-view"

export const metadata: Metadata = {
  title: "Search | Enterprise Commerce",
  description: "In excepteur elit mollit in.",
}

export const revalidate = 86400

export const runtime = "nodejs"

interface SearchPageProps {
  searchParams: Promise<SearchParamsType>
}

export default async function SearchPage(props: SearchPageProps) {
  const searchParams = await props.searchParams;
  return (
    <Suspense fallback={<PageSkeleton />}>
      <SearchView searchParams={searchParams} />
    </Suspense>
  )
}
