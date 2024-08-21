import { PlatformCollection } from "@enterprise-commerce/core/platform/types"
import { meilisearch } from "clients/search"
import { env } from "env.mjs"
import type { Metadata } from "next"
import { isDemoMode } from "utils/demoUtils"
import { CategoryView } from "views/Category/CategoryView"

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

  const { hits } = await meilisearch.searchDocuments<PlatformCollection>({
    indexName: env.MEILISEARCH_CATEGORIES_INDEX,
    options: {
      limit: 50,
      attributesToRetrieve: ["handle"],
    },
  })

  return hits.map(({ handle }) => ({ slug: handle }))
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  return <CategoryView params={params} />
}
