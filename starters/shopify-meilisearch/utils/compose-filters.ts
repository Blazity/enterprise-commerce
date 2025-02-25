import { ComparisonOperators, FilterBuilder } from "../lib/meilisearch/filter-builder"

interface MakeFilterProps {
  minPrice: number | null
  maxPrice: number | null
  categories: string[]
  vendors: string[]
  colors: string[]
  rating?: number | null
}

export function composeFilters(filter: FilterBuilder, parsedSearchParams: MakeFilterProps, separator: string) {
  const filterConditions = [
    {
      predicate: parsedSearchParams.categories.length > 0,
      action: () => {
        parsedSearchParams.categories.forEach((category) => {
          const level = category.split(separator).length - 1
          filter.or().group((sub) => sub.in(`hierarchicalCategories.lvl${level}`, [category]))
        })
      },
    },
    {
      predicate: parsedSearchParams.vendors.length > 0,
      action: () => filter.and().group((sub) => sub.in("vendor", parsedSearchParams.vendors)),
    },
    {
      predicate: parsedSearchParams.colors.length > 0,
      action: () => filter.and().group((sub) => sub.in("flatOptions.Color", parsedSearchParams.colors)),
    },
    {
      predicate: !!parsedSearchParams.minPrice,
      action: () => filter.and().where("minPrice", ComparisonOperators.GreaterThanOrEqual, parsedSearchParams.minPrice!),
    },
    {
      predicate: !!parsedSearchParams.maxPrice,
      action: () => filter.and().where("minPrice", ComparisonOperators.LessThanOrEqual, parsedSearchParams.maxPrice!),
    },
    {
      predicate: !!parsedSearchParams.rating,
      action: () => filter.and().where("avgRating", ComparisonOperators.GreaterThanOrEqual, parsedSearchParams.rating!),
    },
  ]

  filterConditions.forEach(({ predicate, action }) => predicate && action())

  return filter
}
