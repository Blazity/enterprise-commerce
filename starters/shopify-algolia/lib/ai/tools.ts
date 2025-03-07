import { type CoreTool, tool as createTool } from "ai"
import { addCartItem } from "app/actions/cart.actions"
import { getCategories, getProducts } from "lib/algolia"
import { z } from "zod"

export type AllowedTools = "searchProducts" | "searchCategories" | "addToCart" | "navigateUser" | "goToCheckout"

const filtersSchema = z.object({
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  vendors: z.array(z.string()).optional(),
  colors: z.array(z.string()).optional(),
  sortBy: z.string().optional(),
})

const searchProducts = createTool({
  description: "Search for available products",
  parameters: z.object({
    query: z.string({ description: "Keyword for a product" }),
    filters: filtersSchema.optional(),
  }),
  execute: async ({ query }) => {
    const results = await getProducts({ query, hitsPerPage: 5 })

    return {
      results: results.hits,
    }
  },
})

const searchCategories = createTool({
  description: "Search for available categories",
  parameters: z.object({
    query: z.string({ description: "Keyword for a category" }),
  }),
  execute: async ({ query }) => {
    const results = await getCategories({ query, hitsPerPage: 5 })

    return {
      results: results.hits,
    }
  },
})

// this can be done better if we can retrieve the cookie and simply check the cart straight from the server, however this will slow down the actual response whilst the cart will be already provided to the user in the frotnend
const goToCheckout = createTool({
  description: "Navigate the user to the checkout page",
  parameters: z.object({
    checkoutUrl: z.string(),
  }),
  execute: async ({ checkoutUrl }) => {
    return { checkoutUrl }
  },
})

const navigateUser = createTool({
  description: "Navigate the user to the desired page",
  parameters: z.object({
    pageType: z.union([z.literal("product"), z.literal("category"), z.literal("search")]),
    resultSlug: z.string().optional(),
    query: z.string().optional(),
    checkoutUrl: z.string().optional(),
    options: z
      .string()
      .regex(/^[a-zA-Z]+_[a-zA-Z0-9]+$/, { message: "Options must be in the format optionName_optionValue" })
      .toLowerCase()
      .optional(),
    filters: filtersSchema.optional(),
  }),
  execute: async ({ pageType, query, resultSlug, options, filters }) => {
    switch (pageType) {
      case "product": {
        if (!resultSlug) {
          throw new Error("resultSlug is required for product pageType")
        }
        if (options) {
          return `/ai/product/${resultSlug}-${options}`
        }
        return `/ai/product/${resultSlug}`
      }

      case "category": {
        if (!resultSlug) {
          throw new Error("resultSlug is required for category pageType")
        }
        if (filters) {
          const params = processFiltersToSearchParams(filters)
          return `/ai/category/${resultSlug}?${decodeURIComponent(params.toString())}`
        }
        return `/ai/category/${resultSlug}`
      }

      case "search": {
        if (filters) {
          const params = processFiltersToSearchParams({ ...filters, q: query || "" })
          return `/ai/search?${decodeURIComponent(params.toString())}`
        }

        return "/ai/search"
      }

      default:
        return "/ai/search"
    }
  },
})

const addToCart = createTool({
  description: "Add a product to the cart",
  parameters: z.object({
    variant: z.any({ description: "Selected variant" }),
    product: z.any({ description: "Parent product" }),
  }),
  execute: async ({ variant, product }) => {
    await addCartItem(null, variant.id, product.id)

    return { variant, product }
  },
})

function processFiltersToSearchParams(filters: Record<string, string | string[] | number | number[]>) {
  const params = new URLSearchParams()

  for (const [key, value] of Object.entries(filters)) {
    if (!value) continue
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
  navigateUser,
  addToCart,
  goToCheckout,
}
