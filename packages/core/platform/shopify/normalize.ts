import { SingleProductQuery } from "./types/storefront.generated"
import { PlatformProduct } from "../types"

export function normalizeProduct(product: SingleProductQuery["product"]): PlatformProduct | null {
  if (!product) return null
  const { id, handle, title, description, descriptionHtml, options, priceRange, variants, featuredImage, images, tags, updatedAt, collections, seo } = product

  return {
    id,
    handle,
    title,
    description,
    descriptionHtml,
    options,
    priceRange,
    tags,
    updatedAt,
    featuredImage,
    seo,
    variants: variants?.edges?.map(({ node }) => node) || [],
    images: images?.edges?.map(({ node }) => node) || [],
    collections: collections?.nodes || [],
  }
}
