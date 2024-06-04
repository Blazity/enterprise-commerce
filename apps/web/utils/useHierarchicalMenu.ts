import type { CategoriesDistribution } from "meilisearch"
import { useParams, useSearchParams } from "next/navigation"

interface HierarchicalMenuOptions {
  attributes: readonly string[]
  distribution: Record<string, CategoriesDistribution>
  separator: string
}

type HierarchicalMenuItem = Record<string, number>

export const useHierarchicalMenu = ({ attributes, distribution, separator }: HierarchicalMenuOptions) => {
  const { slug } = useParams()
  const searchParams = useSearchParams()
  const normalizedSlug = Array.isArray(slug) ? slug.join(separator) : slug || searchParams.get("categories")?.split(",").join(separator) || ""

  const initialPath = findInitialPath(separator, normalizedSlug, attributes, distribution) || []

  const getCategoryChildren = (path: string[]) => {
    const level = path.length
    const key = attributes[level]
    const prefix = path.join(separator)

    return Object.keys(distribution[key] || {})
      .filter((item) => item.startsWith(prefix))
      .reduce((acc: HierarchicalMenuItem, item) => {
        const category = item.split(separator)[level]
        if (category && !acc[category]) {
          acc[category] = distribution[key][item]
        }
        return acc
      }, {})
  }

  const items: HierarchicalMenuItem = initialPath.length === 0 ? distribution[attributes[0]] : getCategoryChildren(initialPath)
  const parent = initialPath.length > 0 ? initialPath.slice(0, -1).pop() : null
  const current = initialPath.length > 0 ? initialPath.pop() : null

  return {
    items,
    current,
    parent,
  }
}

const findInitialPath = (separator: string, activeCategory: string, attributes: readonly string[], distribution: Record<string, CategoriesDistribution>): string[] => {
  if (activeCategory === "") {
    return []
  }

  for (let level = 0; level < attributes.length; level++) {
    const key = attributes[level]
    const categoriesAtLevel = Object.keys(distribution[key] || {})
    const path = categoriesAtLevel.find((item) => item.endsWith(activeCategory))
    if (path) {
      return path.split(separator)
    }
  }
  return []
}
