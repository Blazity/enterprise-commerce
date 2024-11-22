//@TODO: Make this an available filters per index instead
export interface AvailableFilters {
  minPrice: number
  avgRating: number
  vendor: string[]
  "flatOptions.Color": string[]
  "hierarchicalCategories.lvl0": string[]
  "hierarchicalCategories.lvl1": string[]
  "hierarchicalCategories.lvl2": string[]
  handle: string
  product_handle: string
  published: boolean
  hidden: boolean
  "collections.handle": string[]
}

export interface AvailableFilterParams {
  minPrice: number | null
  maxPrice: number | null
  categories: string[]
  vendors: string[]
  colors: string[]
  rating?: number | null
}
