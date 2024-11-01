import { notFound } from "next/navigation"
import { SearchParamsType } from "types"
import { getCollection } from "lib/meilisearch"
import { SearchView } from "components/search-view"

interface CategoryViewProps {
  params: { slug: string; page?: string }
  searchParams?: SearchParamsType
}

export async function CategoryView({ params, searchParams = {} }: CategoryViewProps) {
  const collection = await getCollection(params.slug)

  if (!collection) return notFound()

  return <SearchView searchParams={searchParams} params={params} collection={collection} />
}
