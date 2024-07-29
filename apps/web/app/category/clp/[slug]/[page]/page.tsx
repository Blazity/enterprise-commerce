import type { PlatformCollection } from "@enterprise-commerce/core/platform/types"
import { meilisearch } from "clients/search"
import { env } from "env.mjs"
import type { Metadata } from "next"
import { isDemoMode } from "utils/demoUtils"
import { CategoryView } from "views/Category/CategoryView"

export const revalidate = 3600
export const dynamic = "force-static"

interface CategoryPageProps {
  params: { slug: string; page: string }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  return {
    title: `${params.slug} | Enterprise Commerce`,
    description: "In excepteur elit mollit in.",
  }
}

export async function generateStaticParams() {
  if (isDemoMode()) return []
  const { results: collections } = await meilisearch.getDocuments<PlatformCollection>({
    indexName: env.MEILISEARCH_CATEGORIES_INDEX,
    options: {
      limit: 1000,
    },
  })

  return collections.map((collection) => Array.from({ length: 3 }, (_, i) => i + 2).map((page) => ({ slug: collection.handle, page: page.toString() }))).flat()
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  return <CategoryView searchParams={{ page: params.page }} params={params} />
}
