import { SingleProductQuery } from "./types/storefront.generated"
import { PlatformProduct } from "../types"

export function normalizeProduct(product: SingleProductQuery["product"]): PlatformProduct | null {
  if (!product) return null
  const { id, handle, title, description, descriptionHtml, options, priceRange, variants, featuredImage, images, tags, updatedAt, createdAt, collections, seo } = product

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
    createdAt,
    updatedAtTimestamp: new Date(updatedAt).getTime() / 1000,
    createdAtTimestamp: new Date(createdAt).getTime() / 1000,
    minPrice: priceRange?.minVariantPrice?.amount || 0,
    variants: variants?.edges?.map(({ node }) => node) || [],
    images: images?.edges?.map(({ node }) => node) || [],
    collections: collections?.nodes || [],
  }
}
