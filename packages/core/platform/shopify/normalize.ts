import { SingleCartQuery, SingleProductQuery } from "./types/storefront.generated"
import { PlatformCart, PlatformCartItem, PlatformProduct } from "../types"

export function normalizeProduct(product: SingleProductQuery["product"]): PlatformProduct | null {
  if (!product) return null
  const { id, handle, title, description, vendor, descriptionHtml, options, priceRange, variants, featuredImage, images, tags, updatedAt, createdAt, collections, seo } = product

  return {
    id,
    handle,
    title,
    description,
    descriptionHtml,
    options,
    vendor,
    priceRange,
    tags,
    featuredImage,
    seo,
    updatedAt,
    createdAt,
    flatOptions: Object.fromEntries(options?.map((option) => [option.name, option.values])),
    updatedAtTimestamp: new Date(updatedAt).getTime() / 1000,
    createdAtTimestamp: new Date(createdAt).getTime() / 1000,
    minPrice: +priceRange?.minVariantPrice?.amount || 0,
    variants: variants?.edges?.map(({ node }) => node) || [],
    images: images?.edges?.map(({ node }) => node) || [],
    collections: collections?.nodes || [],
  }
}

export function normalizeCart(cart: SingleCartQuery["cart"]): PlatformCart | null {
  if (!cart) return null
  const { id, checkoutUrl, cost, lines, totalQuantity } = cart

  return {
    id,
    checkoutUrl,
    cost,
    totalQuantity,
    items: lines.edges.map(({ node }) => ({ ...node, merchandise: { ...node.merchandise, product: { ...normalizeProduct(node.merchandise.product) } } })) as PlatformCartItem[],
  }
}
