import type { Metadata } from "next"
import { isDemoMode } from "utils/demo-utils"
import { getCategories } from "lib/algolia"
import { CategoryCLPView } from "components/category/category-clp-view"
import { SearchParamsType } from "types"

export const revalidate = 86400

export const dynamic = "force-dynamic"

interface CategoryPageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<SearchParamsType>
}

export async function generateMetadata(props: CategoryPageProps): Promise<Metadata> {
  const params = await props.params
  return {
    title: `${params.slug} | Enterprise Commerce`,
    description: "In excepteur elit mollit in.",
  }
}

export default async function CategoryPage(props: CategoryPageProps) {
  const params = await props.params
  const searchParams = await props.searchParams
  return <CategoryCLPView params={params} searchParams={searchParams} />
}
