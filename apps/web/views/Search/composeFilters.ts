import { ComparisonOperators, FilterBuilder } from "../../utils/filterBuilder"

interface MakeFilterProps {
  minPrice: number | null
  maxPrice: number | null
  categories: string[]
  vendors: string[]
  tags: string[]
  colors: string[]
  sizes: string[]
}

export function composeFilters(parsedSearchParams: MakeFilterProps) {
  const filter = new FilterBuilder()

  const filterConditions = [
    {
      predicate: parsedSearchParams.categories.length > 0,
      action: () => filter.and().group((sub) => sub.in("collections.title", parsedSearchParams.categories)),
    },
    {
      predicate: parsedSearchParams.vendors.length > 0,
      action: () => filter.and().group((sub) => sub.in("vendor", parsedSearchParams.vendors)),
    },
    {
      predicate: parsedSearchParams.tags.length > 0,
      action: () => filter.and().group((sub) => sub.in("tags", parsedSearchParams.tags)),
    },
    {
      predicate: parsedSearchParams.colors.length > 0,
      action: () => filter.and().group((sub) => sub.in("flatOptions.Color", parsedSearchParams.colors)),
    },
    {
      predicate: parsedSearchParams.sizes.length > 0,
      action: () => filter.and().group((sub) => sub.in("flatOptions.Size", parsedSearchParams.sizes)),
    },
    {
      predicate: !!parsedSearchParams.minPrice,
      action: () => filter.and().where("minPrice", ComparisonOperators.GreaterThan, parsedSearchParams.minPrice!),
    },
    {
      predicate: !!parsedSearchParams.maxPrice,
      action: () => filter.and().where("minPrice", ComparisonOperators.LessThan, parsedSearchParams.maxPrice!),
    },
  ]

  filterConditions.forEach(({ predicate, action }) => predicate && action())

  return filter
}
