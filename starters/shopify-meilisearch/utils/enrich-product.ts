import { generateImageCaption } from "lib/replicate"
import type { PlatformImage, PlatformMenu, PlatformProduct } from "lib/shopify/types"

/*
 * Enrich product by attaching hierarchical categories to it
 * Takes in all tags, and tries to find hierarchy against it
 * Currently just shopify focused
 */

export const enrichProduct = async (product: PlatformProduct, collections: PlatformMenu["items"]) => {
  const categoryMap = buildCategoryMap(collections)
  const images = await generateProductAltTags(product)
  const hierarchicalCategories = generateHierarchicalCategories(product.tags, categoryMap)

  return {
    ...product,
    images: images.filter(Boolean),
    hierarchicalCategories,
  }
}

function buildCategoryMap(categories: PlatformMenu["items"]) {
  const categoryMap = new Map<string, string[]>()

  function traverse(items: PlatformMenu["items"], path: string[]) {
    for (const item of items) {
      const newPath = [...path, item.resource!.handle]
      categoryMap.set(item.resource!.handle, newPath)
      if (item.items && item.items.length > 0) {
        traverse(item.items, newPath)
      }
    }
  }

  traverse(categories, [])

  return categoryMap
}

function generateHierarchicalCategories(tags: PlatformProduct["tags"], categoryMap: Map<string, string[]>) {
  const hierarchicalCategories: Record<"lvl0" | "lvl1" | "lvl2", string[]> = { lvl0: [], lvl1: [], lvl2: [] }

  if (!tags.length || !categoryMap.size) return hierarchicalCategories

  tags.forEach((tag) => {
    const path = categoryMap.get(tag)
    if (path) {
      if (path.length > 0 && !hierarchicalCategories.lvl0.includes(path[0])) {
        hierarchicalCategories.lvl0.push(path[0])
      }
      if (path.length > 1) {
        const lvl1Path = path.slice(0, 2).join(" > ")
        if (!hierarchicalCategories.lvl1.includes(lvl1Path)) {
          hierarchicalCategories.lvl1.push(lvl1Path)
        }
      }
      if (path.length > 2) {
        const lvl2Path = path.slice(0, 3).join(" > ")
        if (!hierarchicalCategories.lvl2.includes(lvl2Path)) {
          hierarchicalCategories.lvl2.push(lvl2Path)
        }
      }
    }
  })

  return hierarchicalCategories
}

async function generateProductAltTags(product: PlatformProduct): Promise<(PlatformImage | undefined)[]> {
  try {
    const altTagAwareImages = await Promise.all(product?.images?.slice(0, 1).map(mapper).filter(Boolean))
    return [...altTagAwareImages, ...product?.images?.slice(1)?.filter(Boolean)] || []
  } catch (e) {
    console.error(e)
    return product.images // graceful exit
  }

  async function mapper(image: PlatformImage) {
    const output = await generateImageCaption(image.url)

    return { ...image, altText: output?.replace("Caption:", "") || "" }
  }
}
