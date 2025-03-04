import { Suspense } from "react"
import { PageSkeleton } from "components/product/page-skeleton"
import type { SearchParamsType } from "types"
import { SearchView } from "components/search-view"

export default async function AiSearchPage(props: { searchParams: Promise<SearchParamsType> }) {
  const searchParams = await props.searchParams

  return (
    <Suspense fallback={<PageSkeleton />}>
      <SearchView searchParams={searchParams} basePath="ai" />
    </Suspense>
  )
}
