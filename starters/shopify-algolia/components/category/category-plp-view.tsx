import { notFound } from "next/navigation"
import { SearchParamsType } from "types"
import { getCollection } from "lib/algolia/rate-limited"
import { SearchView } from "components/search-view"

interface CategoryPLPViewProps {
  params: { slug: string; page?: string }
  searchParams?: SearchParamsType
  basePath?: string
}

export async function CategoryPLPView({ params, searchParams = {}, basePath }: CategoryPLPViewProps) {
  const collection = await getCollection(params.slug)

  if (!collection) return notFound()

  return <SearchView searchParams={searchParams} params={params} collection={collection} basePath={basePath} />
}
