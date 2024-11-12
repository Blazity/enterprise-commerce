import type { Metadata } from "next"
import { isDemoMode } from "utils/demo-utils"
import { getCategories } from "lib/meilisearch"
import { CategoryView } from "app/category/_components/category-view"

export const revalidate = 86400
export const dynamic = "force-static"

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(props: CategoryPageProps): Promise<Metadata> {
  const params = await props.params;
  return {
    title: `${params.slug} | Enterprise Commerce`,
    description: "In excepteur elit mollit in.",
  }
}

export async function generateStaticParams() {
  if (isDemoMode()) return []

  const { results } = await getCategories({
    limit: 50,
    fields: ["handle"],
  })

  return results.map(({ handle }) => ({ slug: handle }))
}

export default async function CategoryPage(props: CategoryPageProps) {
  const params = await props.params;
  return <CategoryView params={params} />
}
