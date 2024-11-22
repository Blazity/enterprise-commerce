import type { Metadata } from "next"
import { Suspense } from "react"
import type { SearchParamsType } from "types"
import { PageSkeleton } from "app/category/_components/page-skeleton"
import { SearchView } from "components/search-view"
import { getFacetValues } from "lib/algolia"
import { env } from "env.mjs"

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
  const searchParams = await props.searchParams

  const facetValues = await getFacetValues({
    indexName: env.ALGOLIA_PRODUCTS_INDEX,
    facetName: "flatOptions.Color",
  })

  console.log({ facetValues })
  return (
    <Suspense fallback={<PageSkeleton />}>
      <SearchView searchParams={searchParams} />
    </Suspense>
  )
}
