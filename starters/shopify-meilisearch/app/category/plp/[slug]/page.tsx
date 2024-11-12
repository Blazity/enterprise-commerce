import type { Metadata } from "next"
import { SearchParamsType } from "types"
import { CategoryView } from "app/category/_components/category-view"

export const runtime = "nodejs"

export const revalidate = 86400

interface ProductListingPageProps {
  searchParams: Promise<SearchParamsType>
  params: Promise<{ slug: string }>
}

export async function generateMetadata(props: ProductListingPageProps): Promise<Metadata> {
  const params = await props.params;
  return {
    title: `${params.slug} | Enterprise Commerce`,
    description: "In excepteur elit mollit in.",
  }
}

export default async function ProductListingPage(props: ProductListingPageProps) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  return <CategoryView params={params} searchParams={searchParams} />
}
