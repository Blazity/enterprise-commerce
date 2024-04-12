import { storefrontClient } from "clients/storefrontClient"
import type { Metadata } from "next"
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
  const collections = (await storefrontClient.getCollections()) || []

  return collections?.map((collection) => ({ slug: collection.handle }))
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  return <CategoryView params={params} />
}
