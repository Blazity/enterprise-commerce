import { ComparisonOperators, FilterBuilder } from "lib/algolia/filter-builder"
import type { AvailableFilterParams } from "lib/algolia/filters"

export function composeFilters(filter: FilterBuilder, parsedSearchParams: AvailableFilterParams, separator: string) {
  const filterConditions = [
    {
      predicate: parsedSearchParams.categories.length > 0,
      action: () => {
        parsedSearchParams.categories.forEach((category) => {
          const level = category.split(separator).length - 1 > 2 ? 2 : category.split(separator).length - 1
          filter.or().group((sub) => sub.in(`hierarchicalCategories.lvl${level as 0 | 1 | 2}`, [category]))
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
      action: () => filter.and().where("minPrice", parsedSearchParams.minPrice!, ComparisonOperators.GreaterThanOrEqual),
    },
    {
      predicate: !!parsedSearchParams.maxPrice,
      action: () => filter.and().where("minPrice", parsedSearchParams.maxPrice!, ComparisonOperators.LessThanOrEqual),
    },
    {
      predicate: !!parsedSearchParams.rating,
      action: () => filter.and().where("avgRating", parsedSearchParams.rating!, ComparisonOperators.GreaterThanOrEqual),
    },
  ]

  filterConditions.forEach(({ predicate, action }) => predicate && action())
  return filter
}
