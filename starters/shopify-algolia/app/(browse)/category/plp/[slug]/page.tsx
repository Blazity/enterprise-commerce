import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { SearchParamsType } from "types"
import { CategoryPLPView } from "components/category/category-plp-view"
import { isDemoMode } from "utils/demo-utils"
import { getCategories, getCollection } from "lib/algolia"

export const runtime = "nodejs"
export const revalidate = 86400
// Allow dynamic rendering for query parameters
export const dynamic = "force-dynamic"

interface ProductListingPageProps {
  searchParams: Promise<SearchParamsType>
  params: Promise<{ slug: string }>
}

export async function generateMetadata(props: ProductListingPageProps): Promise<Metadata> {
  const params = await props.params
  return {
    title: `${params.slug} | Enterprise Commerce`,
    description: "In excepteur elit mollit in.",
  }
}

export async function generateStaticParams() {
  if (isDemoMode()) return []

  const { hits } = await getCategories({
    hitsPerPage: 50,
    attributesToRetrieve: ["handle"],
  })

  return hits.map(({ handle }) => ({ slug: handle }))
}

export default async function ProductListingPage(props: ProductListingPageProps) {
  const params = await props.params
  const searchParams = await props.searchParams
  
  return <CategoryPLPView params={params} searchParams={searchParams} />
}
