import { getCollection } from "app/actions/collection.actions"
import { notFound } from "next/navigation"
import { SearchParamsType } from "types"
import { SearchView } from "views/Search/SearchView"

interface CategoryViewProps {
  params: { slug: string; page?: string }
  searchParams?: SearchParamsType
}

export async function CategoryView({ params, searchParams = {} }: CategoryViewProps) {
  const collection = await getCollection(params.slug)

  if (!collection) return notFound()

  return <SearchView searchParams={searchParams} params={params} collection={collection} />
}
