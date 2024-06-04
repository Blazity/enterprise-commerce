import { env } from "process"

export const COOKIE_CART_ID = "ecom_cartId"
export const COOKIE_ACCESS_TOKEN = "ecom_accessToken"

export const COOKIE_FAVORITES = "ecom_favorites"

export const TAGS = {
  CART: "cart",
} as const

export const BUCKETS = {
  HOME: ["a", "b"],
} as const

export const facetParams = ["q", "minPrice", "maxPrice", "sortBy", "categories", "vendors", "tags", "colors", "sizes", "rating"] as const
export const HIERARCHICAL_ATRIBUTES = ["hierarchicalCategories.lvl0", "hierarchicalCategories.lvl1", "hierarchicalCategories.lvl2"] as const
export const HIERARCHICAL_SEPARATOR = " > "
export const HITS_PER_PAGE = 24

export const DISABLED_FACETS_MAP: Partial<Record<(typeof facetParams)[number], boolean>> = {
  categories: !env.SHOPIFY_HIERARCHICAL_NAV_HANDLE,
}

export const DISABLED_FACETS = Object.keys(DISABLED_FACETS_MAP).filter((key) => DISABLED_FACETS_MAP[key])
