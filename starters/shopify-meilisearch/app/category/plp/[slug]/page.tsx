import type { Metadata } from "next"
import { SearchParamsType } from "types"
import { CategoryView } from "views/category/category-view"

interface ProductListingPageProps {
  searchParams: SearchParamsType
  params: Promise<{ slug: string }>
}

export async function generateMetadata(props: ProductListingPageProps): Promise<Metadata> {
  const params = await props.params
  return {
    title: `${params.slug} | Enterprise Commerce`,
    description: "In excepteur elit mollit in.",
  }
}

export default async function ProductListingPage({ searchParams, params }: ProductListingPageProps) {
  return <CategoryView params={params} searchParams={searchParams} />
}
