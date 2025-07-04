import { notFound } from "next/navigation"
import { SearchParamsType } from "types"
import { getCollection } from "lib/algolia/rate-limited"
import { getProductsByCollectionTag } from "lib/algolia"
import { CategoryLandingPage } from "./category-landing-page"
import { SearchView } from "components/search-view"

interface CategoryCLPViewProps {
  params: { slug: string; page?: string }
  searchParams?: SearchParamsType
  basePath?: string
}

export async function CategoryCLPView({ params, basePath, searchParams = {} }: CategoryCLPViewProps) {
  const collection = await getCollection(params.slug)

  if (!collection) return notFound()

  const pageDisplayType = collection.pageDisplayTypeMetafield?.value || "PLP"

  console.log({ pageDisplayType })

  const shouldShowCLP = pageDisplayType === "CLP"

  if (!shouldShowCLP) {
    return <SearchView searchParams={searchParams} params={params} collection={collection} basePath={basePath} />
  }

  const products = await getProductsByCollectionTag(collection.handle, 20)

  return <CategoryLandingPage collection={collection} products={products} basePath={basePath} />
}
