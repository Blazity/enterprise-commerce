import { PlatformCollection } from "@enterprise-commerce/core/platform/types"
import { meilisearch } from "clients/meilisearch"
import { env } from "env.mjs"
import type { Metadata } from "next"
import { isDemoMode } from "utils/demoUtils"
import { CategoryView } from "views/Category/CategoryView"

export const revalidate = 3600
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

  const index = await meilisearch?.getIndex<PlatformCollection>(env.MEILISEARCH_CATEGORIES_INDEX)
  const collections = (await index?.getDocuments({ limit: 1000 }))?.results || []

  return collections.map((collection) => ({ slug: collection.handle }))
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  return <CategoryView params={params} />
}
