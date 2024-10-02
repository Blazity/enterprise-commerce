import type { Metadata } from "next"
import { CategoryView } from "views/Category/CategoryView"

export const revalidate = 86400
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
  return []
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  return <CategoryView searchParams={{ page: params.page }} params={params} />
}
