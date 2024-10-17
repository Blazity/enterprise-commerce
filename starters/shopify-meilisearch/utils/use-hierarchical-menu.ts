import type { CategoriesDistribution } from "meilisearch"
import { useParams } from "next/navigation"
import { HIERARCHICAL_SEPARATOR } from "constants/index"

interface HierarchicalMenuOptions {
  attributes: readonly string[]
  distribution: Record<string, CategoriesDistribution>
  separator?: string
  transformItems?: (items: HierarchicalMenuItem[]) => HierarchicalMenuItem[]
}

export interface HierarchicalMenuItem {
  value: string
  count: number
  isRefined: boolean
  data: HierarchicalMenuItem[]
}

export const useHierarchicalMenu = ({ attributes, distribution, separator = HIERARCHICAL_SEPARATOR, transformItems }: HierarchicalMenuOptions) => {
  const { slug } = useParams()
  const normalizedSlug = Array.isArray(slug) ? slug.join(separator) : slug
  const initialPath = slug ? findInitialPath(normalizedSlug, attributes, distribution, separator) : []

  const getCategoryChildren = (path: string[]): HierarchicalMenuItem[] => {
    const level = path.length
    const key = attributes[level]
    const prefix = path.join(separator)

    return Object.keys(distribution[key] || {})
      .filter((item) => item.startsWith(prefix))
      .map((item) => {
        const category = item.split(separator)[level]
        const subCategoryPath = [...path, category]
        return {
          value: category,
          count: distribution[key][item],
          isRefined: initialPath.includes(category) || subCategoryPath.join(separator) === normalizedSlug,
          data: getCategoryChildren(subCategoryPath),
        }
      })
      .filter((item, index, self) => item.value && self.findIndex((i) => i.value === item.value) === index)
  }

  const items: HierarchicalMenuItem[] = Object.keys(distribution[attributes[0]] || {}).map((key) => {
    return {
      value: key,
      count: distribution[attributes[0]][key],
      isRefined: initialPath.includes(key),
      data: getCategoryChildren([key]),
    }
  })

  const parent = initialPath.length > 1 ? initialPath.slice(0, -1).join(separator) : null

  return {
    items: transformItems ? transformItems(items) : items,
    parent,
  }
}

const findInitialPath = (activeCategory: string, attributes: readonly string[], distribution: Record<string, CategoriesDistribution>, separator: string): string[] => {
  const activeCategoryParts = activeCategory.split(separator)

  for (let level = 0; level < attributes.length; level++) {
    const key = attributes[level]
    const categoriesAtLevel = Object.keys(distribution[key] || {})

    const exactPathMatch = categoriesAtLevel.find((item) => item === activeCategory)

    if (exactPathMatch) {
      return exactPathMatch.split(separator)
    }

    const partialMatch = categoriesAtLevel.find((item) => {
      const itemParts = item.split(separator)
      return itemParts[itemParts.length - 1] === activeCategoryParts[activeCategoryParts.length - 1]
    })

    if (partialMatch) {
      return partialMatch.split(separator)
    }
  }

  return []
}
