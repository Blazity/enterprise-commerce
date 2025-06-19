import { notFound, redirect } from "next/navigation"
import { SearchParamsType } from "types"
import { getCollection, getProductsByCollectionTag } from "lib/algolia"
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


  let pageDisplayType = ""

  if (collection.handle === "sports-and-outdoors") {
    // Special case for "sports-and-outdoors" collection
    pageDisplayType = "CLP" // Force CLP for this collection
  } else {
    // Use the pageDisplayTypeMetafield from the collection
    pageDisplayType = collection.pageDisplayTypeMetafield?.value || "PLP"
  }

  console.log({pageDisplayType})

  // Check if this should be a CLP based on the pageDisplayTypeMetafield
  const shouldShowCLP = pageDisplayType === "CLP"

  if( !shouldShowCLP) {

  return <SearchView searchParams={searchParams} params={params} collection={collection} basePath={basePath} />

  }

  // Always render CLP - fetch products by collection tag
  const products = await getProductsByCollectionTag(collection.handle, 20)

  return <CategoryLandingPage collection={collection} products={products} basePath={basePath} />
}
