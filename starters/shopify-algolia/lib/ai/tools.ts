import { tool as createTool, type CoreTool } from "ai"
import { getCategories, getProducts } from "lib/algolia"
import { z } from "zod"

export type AllowedTools = "searchProducts" | "searchCategories" | "buildNavigationQuery"

const searchProducts = createTool({
  description: "Search for available products to route to",
  parameters: z.object({
    query: z.string({ description: " Keyword for a product" }),
  }),
  execute: async function ({ query }) {
    const results = await getProducts({ query, hitsPerPage: 5 })

    return { results: results.hits, availableFilters: results.facetDistribution }
  },
})

const searchCategories = createTool({
  description: "Search for available categories to route to",
  parameters: z.object({
    query: z.string({ description: "Keyword for a category" }),
  }),
  execute: async function ({ query }) {
    const results = await getCategories({ query, hitsPerPage: 5 })

    return { results: results.hits, availableFilters: results.facetDistribution }
  },
})

const buildNavigationQuery = createTool({
  description: "Build URL to navigate the user to",
  parameters: z.object({
    result: z.object({
      handle: z.string(),
    }),
    resultType: z.union([z.literal("product"), z.literal("category"), z.literal("search")]),
    filters: z
      .object({
        minPrice: z.number().optional(),
        maxPrice: z.number().optional(),
        vendors: z.array(z.string()).optional(),
        colors: z.array(z.string()).optional(),
        sortBy: z.string().optional(),
      })
      .optional(),
  }),
  execute: async function ({ result, resultType, ...rest }) {
    switch (resultType) {
      case "product":
        return `/ai/product/${result.handle}`

      case "category": {
        if ("filters" in rest) {
          const params = processFiltersToSearchParams(rest.filters!)
          return `/ai/category/${result.handle}?${decodeURIComponent(params.toString())}`
        }
        return `/ai/category/${result.handle}`
      }

      case "search": {
        if ("filters" in rest) {
          const params = processFiltersToSearchParams(rest.filters!)
          return `/ai/search?${decodeURIComponent(params.toString())}`
        }
        return `/ai/search/`
      }
    }
  },
})

function processFiltersToSearchParams(filters: Record<string, string | string[] | number | number[]>) {
  const params = new URLSearchParams()

  for (const [key, value] of Object.entries(filters)) {
    if (key === "sortBy") {
      switch (value) {
        case "price-high-to-low":
          params.set("sortBy", "minPrice:desc")
          break
        case "price-low-to-high":
          params.set("sortBy", "minPrice:asc")
          break
        case "customer-reviews":
          params.set("sortBy", "avgRating:desc")
          break
        case "newest":
          params.set("sortBy", "updatedAtTimestamp:asc")
          break
        case "oldest":
          params.set("sortBy", "updatedAtTimestamp:desc")
          break
        case "relevancy":
          params.delete("sortBy")
          break
        default:
          break
      }
    } else if (Array.isArray(value)) {
      params.set(key, value.join(","))
    } else {
      params.set(key, value.toString())
    }
  }

  return params
}

export const tools: Record<AllowedTools, CoreTool> = {
  searchProducts,
  searchCategories,
  buildNavigationQuery,
}
