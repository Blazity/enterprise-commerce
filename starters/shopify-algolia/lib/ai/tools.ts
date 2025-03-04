import { tool as createTool, type CoreTool } from "ai"
import { HIERARCHICAL_SEPARATOR } from "constants/index"
import { env } from "env.mjs"
import { searchProducts as algoliaSearchProducts, getCategories, getFacetValues } from "lib/algolia"
import { buildSearchFilter } from "utils/build-search-filter"
import { z } from "zod"

export type AllowedTools = "searchProducts" | "searchCategories" | "buildNavigationQuery"

const searchProducts = createTool({
  description: "Search for products in the shop",
  parameters: z.object({
    minPrice: z.number({ description: "Minimum price of the product" }).min(1).optional(),
    maxPrice: z.number({ description: "Maximum price of the product, needs to be greater than minPrice" }).min(1).optional(),
    sortBy: z
      .enum(["minPrice:asc", "minPrice:desc", "avgRating:desc", "updatedAtTimestamp:asc", "updatedAtTimestamp:desc"], { description: "Sort by price, rating, etc" })
      .optional(),
    categories: z.array(z.string()).optional(),
    vendors: z.array(z.string()).optional(),
    colors: z.array(z.string({ description: "Color of the product" })).optional(),
    rating: z.number({ description: "Rating of the product, needs to be between 1 and 5" }).min(1).max(5).optional(),
    noOfProducts: z.number({ description: "Number of products to return" }).min(1).max(200).optional(),
  }),
  execute: async function ({ sortBy, noOfProducts, ...rest }) {
    const filter = buildSearchFilter({
      params: {
        categories: rest.categories || [],
        vendors: rest.vendors || [],
        colors: rest.colors || [],
        minPrice: rest.minPrice || null,
        maxPrice: rest.maxPrice || null,
        rating: rest.rating || null,
      },
      separator: HIERARCHICAL_SEPARATOR,
    })

    return (await algoliaSearchProducts("", sortBy || "", filter, noOfProducts || 12))?.hits
  },
})

const searchCategories = createTool({
  description: "Search through categories in the shop",
  parameters: z.object({
    query: z.string({ description: "Query to search for" }),
  }),
  execute: async function ({ query }) {
    return (await getCategories({ query }))?.hits
  },
})

const buildNavigationQuery = createTool({
  description: "Build query to navigate to a specific page",
  parameters: z.object({
    minPrice: z.number({ description: "Minimum price of the product" }).min(1).optional(),
    maxPrice: z.number({ description: "Maximum price of the product, needs to be greater than minPrice" }).min(1).optional(),
    sortBy: z
      .enum(["minPrice:asc", "minPrice:desc", "avgRating:desc", "updatedAtTimestamp:asc", "updatedAtTimestamp:desc"], { description: "Sort by price, rating, etc" })
      .optional(),
    categories: z.array(z.string()).optional(),
    vendors: z.array(z.string()).optional(),
    colors: z.array(z.string({ description: "Color of the product" })).optional(),
    rating: z.number({ description: "Rating of the product, needs to be between 1 and 5" }).min(1).max(5).optional(),
    noOfProducts: z.number({ description: "Number of products to return" }).min(1).max(200).optional(),
    slug: z.string({ description: "Slug of the product or category" }).optional(),
    segment: z.enum(["product", "category", "search"], { description: "Navigate to a specific segment of the website either product, category or search" }),
  }),
  execute: async function ({ segment, slug, ...queryParams }) {
    return { segment, slug, queryParams }
  },
})

const searchFacetValues = createTool({
  description: "Find possible filters for the given query",
  parameters: z.object({
    facetName: z.string({ description: "Name of the facet to search for" }),
  }),
  execute: async function ({ facetName }) {
    const facets = await getFacetValues({
      indexName: env.ALGOLIA_PRODUCTS_INDEX,
      facetName,
    })

    return facets
  },
})

export const tools: Record<AllowedTools, CoreTool> = {
  searchProducts,
  searchCategories,
  buildNavigationQuery,
}
