import { tool as createTool, type CoreTool } from "ai"
import { getCategories, getProducts } from "lib/algolia"
import { z } from "zod"

export type AllowedTools = "searchProducts" | "searchCategories"

const searchProducts = createTool({
  description: "Search for products in the shop",
  parameters: z.object({
    query: z.string({ description: "Query to search for" }).optional(),
    maxPrice: z.number({ description: "Maximum price of the product, needs to be greater than minPrice" }).min(0).max(200).optional(),
    sortBy: z.string({ description: "Sort by price, rating, etc" }).default("price:desc").optional(),
    categories: z.array(z.string()).optional(),
    vendors: z.array(z.string()).optional(),
    colors: z.array(z.string({ description: "Color of the product" })).optional(),
    rating: z.number({ description: "Rating of the product, needs to be between 1 and 5" }).min(1).max(5).optional(),
  }),
  execute: async function ({ query }) {
    const { hits } = await getProducts({
      query,
      hitsPerPage: 8,
    })

    return hits
  },
})

const searchCategories = createTool({
  description: "Search through categories in the shop",
  parameters: z.object({
    query: z.string({ description: "Query to search for" }),
  }),
  execute: async function ({ query }) {
    const { hits } = await getCategories({ query, hitsPerPage: 6 })

    return hits
  },
})

export const tools: Record<AllowedTools, CoreTool> = {
  searchProducts,
  searchCategories,
}
