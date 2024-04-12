import { SearchParamsType } from "types"
import { SearchView } from "views/Search/SearchView"

interface CategoryViewProps {
  params: { slug: string; page?: string }
  searchParams?: SearchParamsType
}

export async function CategoryView({ params, searchParams = {} }: CategoryViewProps) {
  return <SearchView searchParams={searchParams} params={params} disabledFacets={["category", "tags"]} collection={undefined} intro={null} />
}
