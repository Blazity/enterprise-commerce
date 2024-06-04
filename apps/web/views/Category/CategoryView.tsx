import { getCollection } from "app/actions/collection.actions"
import { DISABLED_FACETS } from "constants/index"
import { notFound } from "next/navigation"
import { SearchParamsType } from "types"
import { HeroSection } from "views/Category/HeroSection"
import { SearchView } from "views/Search/SearchView"

interface CategoryViewProps {
  params: { slug: string; page?: string }
  searchParams?: SearchParamsType
}

export async function CategoryView({ params, searchParams = {} }: CategoryViewProps) {
  const collection = await getCollection(params.slug)

  if (!collection) return notFound()

  return (
    <SearchView
      searchParams={searchParams}
      disabledFacets={DISABLED_FACETS}
      params={params}
      collection={collection}
      intro={<HeroSection handle={collection.handle} title={collection.title} description={collection.description} image={collection.image} />}
    />
  )
}
