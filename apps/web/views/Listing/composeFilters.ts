import { ComparisonOperators, FilterBuilder } from "../../utils/filterBuilder"

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
      action: () => filter.and().group((sub) => sub.in(`hierarchicalCategories.lvl${parsedSearchParams.categories.length - 1}`, [parsedSearchParams.categories.join(separator)])),
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
