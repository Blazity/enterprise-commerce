import { Suspense } from "react"
import { PageSkeleton } from "components/product/page-skeleton"
import type { SearchParamsType } from "types"
import { SearchView } from "components/search-view"
import { AiSearchView } from "components/search/ai-search-view"

export default async function AiSearchPage(props: { searchParams: Promise<SearchParamsType> }) {
  const searchParams = await props.searchParams

  if (searchParams?.mode === "concierge") {
    return (
      <Suspense fallback={<PageSkeleton />}>
        <AiSearchView />
      </Suspense>
    )
  }

  return (
    <Suspense fallback={<PageSkeleton />}>
      <SearchView searchParams={searchParams} basePath="ai" />
    </Suspense>
  )
}
