import type { Metadata } from "next"
import { SearchParamsType } from "types"
import { CategoryView } from "app/category/_components/category-view"

export const runtime = "nodejs"

export const revalidate = 86400

interface ProductListingPageProps {
  searchParams: SearchParamsType
  params: { slug: string }
}

export async function generateMetadata({ params }: ProductListingPageProps): Promise<Metadata> {
  return {
    title: `${params.slug} | Enterprise Commerce`,
    description: "In excepteur elit mollit in.",
  }
}

export default async function ProductListingPage({ searchParams, params }: ProductListingPageProps) {
  return <CategoryView params={params} searchParams={searchParams} />
}
