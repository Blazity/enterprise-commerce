import type { Metadata } from "next"
import { env } from "env.mjs"
import { SearchParamsType } from "types"
import { CategoryPLPView } from "components/category/category-plp-view"
import { isDemoMode } from "utils/demo-utils"
import { getCategories } from "lib/algolia"

export const runtime = "nodejs"
export const revalidate = 86400

export const dynamic = "force-dynamic"

interface ProductListingPageProps {
  searchParams: Promise<SearchParamsType>
  params: Promise<{ slug: string }>
}

export async function generateMetadata(props: ProductListingPageProps): Promise<Metadata> {
  const params = await props.params
  return {
    metadataBase: new URL(env.LIVE_URL!),
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
