import type { Metadata } from "next"
import { CategoryCLPView } from "components/category/category-clp-view"
import { SearchParamsType } from "types"
import { env } from "env.mjs"

export const revalidate = 86400

export const dynamic = "force-dynamic"

interface CategoryPageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<SearchParamsType>
}

export async function generateMetadata(props: CategoryPageProps): Promise<Metadata> {
  const params = await props.params
  return {
    metadataBase: new URL(env.LIVE_URL!),
    title: `${params.slug} | Enterprise Commerce`,
    description: "In excepteur elit mollit in.",
  }
}

export default async function CategoryPage(props: CategoryPageProps) {
  const params = await props.params
  const searchParams = await props.searchParams
  return <CategoryCLPView params={params} searchParams={searchParams} />
}
