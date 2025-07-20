import type { Metadata } from "next"
import { CategoryCLPView } from "components/category/category-clp-view"
import { env } from "env.mjs"

export const revalidate = 86400
export const dynamic = "force-static"

interface CategoryPageProps {
  params: Promise<{ slug: string; page: string }>
}

export async function generateMetadata(props: CategoryPageProps): Promise<Metadata> {
  const params = await props.params
  return {
    metadataBase: new URL(env.LIVE_URL!),
    title: `${params.slug} | Enterprise Commerce`,
    description: "In excepteur elit mollit in.",
  }
}

export async function generateStaticParams() {
  return []
}

export default async function CategoryPage(props: CategoryPageProps) {
  const params = await props.params
  return <CategoryCLPView searchParams={{ page: params.page }} params={params} />
}
