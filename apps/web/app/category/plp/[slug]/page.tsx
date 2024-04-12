import type { Metadata } from "next"
import { SearchParamsType } from "types"
import { CategoryView } from "views/Category/CategoryView"

export const runtime = "edge"

export const revalidate = 3600

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
