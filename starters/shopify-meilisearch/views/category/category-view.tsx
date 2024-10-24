import { getCollection } from "app/actions/collection.actions"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { SearchParamsType } from "types"
import { SearchView } from "views/search/search-view"

interface CategoryViewProps {
  params: Promise<{ slug: string; page?: string }>
  searchParams?: SearchParamsType
}

export async function CategoryView({ params: promiseParams, searchParams }: CategoryViewProps) {
  const params = await promiseParams
  const collection = await getCollection(params.slug)

  if (!collection) return notFound()

  return (
    <Suspense>
      <SearchView searchParams={searchParams || Promise.resolve({})} params={params} collection={collection} />
    </Suspense>
  )
}
