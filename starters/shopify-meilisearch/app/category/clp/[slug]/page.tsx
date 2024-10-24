import type { Metadata } from "next"

import { CategoryView } from "views/category/category-view"
import type { PlatformCollection } from "lib/shopify/types"
import { meilisearch } from "clients/search"
import { env } from "env.mjs"
import { isDemoMode } from "utils/demo-utils"
import { Suspense } from "react"

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(props: CategoryPageProps): Promise<Metadata> {
  const params = await props.params

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
  return (
    <Suspense>
      <CategoryView params={params} />
    </Suspense>
  )
}
