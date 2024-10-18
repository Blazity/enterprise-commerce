import { PlatformCollection } from "lib/shopify/types"
import { algolia } from "clients/search"
import { env } from "env.mjs"
import type { Metadata } from "next"
import { isDemoMode } from "utils/demo-utils"
import { CategoryView } from "views/category/category-view"

export const revalidate = 86400
export const dynamic = "force-static"

interface CategoryPageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  return {
    title: `${params.slug} | Enterprise Commerce`,
    description: "In excepteur elit mollit in.",
  }
}

export async function generateStaticParams() {
  if (isDemoMode()) return []

  const { hits } = await algolia.search<PlatformCollection>({
    indexName: env.ALGOLIA_CATEGORIES_INDEX,
    searchParams: {
      hitsPerPage: 50,
      attributesToRetrieve: ["handle"],
    },
  })

  return hits.map(({ handle }) => ({ slug: handle }))
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  return <CategoryView params={params} />
}
