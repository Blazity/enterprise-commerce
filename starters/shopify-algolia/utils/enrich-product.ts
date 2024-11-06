import { generateImageCaption } from "lib/replicate"
import { Review } from "lib/reviews/types"
import type { PlatformImage, PlatformMenu, PlatformProduct } from "lib/shopify/types"
import { CommerceProduct } from "types"
import { isOptIn } from "./opt-in"

/*
 * Enrich product by attaching hierarchical categories to it
 * Takes in all tags, and tries to find hierarchy against it
 */

export class ProductEnrichmentBuilder {
  private product: CommerceProduct

  constructor(baseProduct: PlatformProduct) {
    this.product = baseProduct
  }

  withHierarchicalCategories(collections: PlatformMenu["items"], separator: string): this {
    const categoryMap = buildCategoryMap(collections)

    if (!categoryMap.size) {
      return this
    }

    this.product = {
      ...this.product,
      hierarchicalCategories: generateHierarchicalCategories(this.product.tags, categoryMap, separator),
    }
    return this
  }

  withReviews(allReviews: Review[]): this {
    if (!isOptIn("reviews")) {
      return this
    }

    const productReviews = allReviews.filter((review) => review.product_handle === this.product.handle)

    if (productReviews.length) {
      const avgRating = productReviews.reduce((acc, review) => acc + review.rating, 0) / productReviews.length || 0

      this.product = {
        ...this.product,
        avgRating,
        totalReviews: productReviews.length,
      }
    }
    return this
  }

  async withAltTags(): Promise<this> {
    if (!isOptIn("altTags")) {
      return this
    }

    try {
      const images = await generateProductAltTags(this.product)
      this.product = {
        ...this.product,
        images: images.filter(Boolean),
      }
    } catch (e) {
      console.error(e)
    }
    return this
  }

  build(): CommerceProduct {
    return this.product
  }
}

async function generateProductAltTags(product: PlatformProduct): Promise<(PlatformImage | undefined)[]> {
  try {
    const altTagAwareImages = await Promise.all(product.images?.slice(0, 1).map(mapper).filter(Boolean))
    return [...altTagAwareImages, ...product.images?.slice(1)?.filter(Boolean)] || []
  } catch (e) {
    console.error(e)
    return product.images // graceful exit
  }
}

async function mapper(image: PlatformImage) {
  const output = await generateImageCaption(image.url)
  return { ...image, altText: output?.replace("Caption:", "") || "" }
}

export function buildCategoryMap(items: PlatformMenu["items"]): Map<string, string[]> {
  const categoryMap = new Map<string, string[]>()

  const traverse = (items: PlatformMenu["items"], path: string[]) => {
    for (const item of items) {
      const newPath = [...path, item.resource?.handle || ""]
      categoryMap.set(item.resource?.handle || "", newPath)
      if (item.items && item.items.length > 0) {
        traverse(item.items, newPath)
      }
    }
  }

  traverse(items, [])
  return categoryMap
}

export function generateHierarchicalCategories(collections: PlatformProduct["tags"], categoryMap: Map<string, string[]>, separator: string = " > ") {
  const hierarchicalCategories: { lvl0: string[]; lvl1: string[]; lvl2: string[] } = { lvl0: [], lvl1: [], lvl2: [] }

  collections.forEach((tag) => {
    const path = categoryMap.get(tag)
    if (path) {
      if (path.length > 0 && !hierarchicalCategories.lvl0.includes(path[0])) {
        hierarchicalCategories.lvl0.push(path[0])
      }
      if (path.length > 1) {
        const lvl1Path = path.slice(0, 2).join(separator)
        if (!hierarchicalCategories.lvl1.includes(lvl1Path)) {
          hierarchicalCategories.lvl1.push(lvl1Path)
        }
      }
      if (path.length > 2) {
        const lvl2Path = path.slice(0, 3).join(separator)
        if (!hierarchicalCategories.lvl2.includes(lvl2Path)) {
          hierarchicalCategories.lvl2.push(lvl2Path)
        }
      }
    }
  })

  return hierarchicalCategories
}
