import { notFound } from "next/navigation"
import { SearchParamsType } from "types"
import { getCollection } from "lib/algolia/rate-limited"
import { getProductsByCollectionTag } from "lib/algolia"
import { CategoryLandingPage } from "./category-landing-page"
import { SearchView } from "components/search-view"
import { getPageDisplayTypeByHandle } from "utils/get-page-display-type"

interface CategoryCLPViewProps {
  params: { slug: string; page?: string }
  searchParams?: SearchParamsType
  basePath?: string
}

export async function CategoryCLPView({ params, basePath, searchParams = {} }: CategoryCLPViewProps) {
  const collection = await getCollection(params.slug)

  if (!collection) return notFound()

  const pageDisplayType = getPageDisplayTypeByHandle(params.slug)

  const shouldShowCLP = pageDisplayType === "CLP"

  if (!shouldShowCLP) {
    return <SearchView searchParams={searchParams} params={params} collection={collection} basePath={basePath} />
  }

  const products = await getProductsByCollectionTag(collection.handle, 20)

  return <CategoryLandingPage collection={collection} products={products} basePath={basePath} />
}
