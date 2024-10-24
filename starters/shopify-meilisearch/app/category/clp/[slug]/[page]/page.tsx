import type { Metadata } from "next"
import { CategoryView } from "views/category/category-view"

interface CategoryPageProps {
  params: Promise<{ slug: string; page: string }>
}

export async function generateMetadata(props: CategoryPageProps): Promise<Metadata> {
  const params = await props.params
  return {
    title: `${params.slug} | Enterprise Commerce`,
    description: "In excepteur elit mollit in.",
  }
}

export async function generateStaticParams() {
  return []
}

export default async function CategoryPage(props: CategoryPageProps) {
  return <CategoryView searchParams={props.params} params={props.params} />
}
