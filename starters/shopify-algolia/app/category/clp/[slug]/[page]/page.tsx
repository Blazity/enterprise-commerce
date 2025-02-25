import type { Metadata } from "next"
import { CategoryView } from "app/category/_components/category-view"

export const revalidate = 86400
export const dynamic = "force-static"

interface CategoryPageProps {
  params: Promise<{ slug: string; page: string }>
}

export async function generateMetadata(props: CategoryPageProps): Promise<Metadata> {
  const params = await props.params;
  return {
    title: `${params.slug} | Enterprise Commerce`,
    description: "In excepteur elit mollit in.",
  }
}

export async function generateStaticParams() {
  return []
}

export default async function CategoryPage(props: CategoryPageProps) {
  const params = await props.params;
  return <CategoryView searchParams={{ page: params.page }} params={params} />
}
