import { type CoreTool, tool as createTool } from "ai"
import { getCategories, getProducts } from "lib/algolia"
import { z } from "zod"

export type AllowedTools =
  | "searchProducts"
  | "searchCategories"
  // "addToCart" |
  | "navigateUser"

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
    console.log({ query, tool: "searchProducts" })
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
    console.log({ query, tool: "searchCategories" })
    const results = await getCategories({ query, hitsPerPage: 5 })

    return {
      results: results.hits,
    }
  },
})

const navigateUser = createTool({
  description: "Navigate the user to the desired page",
  parameters: z.object({
    pageType: z.union([z.literal("product"), z.literal("category"), z.literal("search")]),
    resultType: z.union([z.literal("product"), z.literal("category"), z.literal("search")]),
    resultSlug: z.string(),
    filters: filtersSchema.optional(),
  }),
  execute: async ({ resultSlug, pageType, ...rest }) => {
    console.log({ resultSlug, pageType, rest, tool: "navigateUser" })
    switch (pageType) {
      case "product":
        return `/ai/product/${resultSlug}`

      case "category": {
        if ("filters" in rest) {
          const params = processFiltersToSearchParams(rest.filters!)
          return `/ai/category/${resultSlug}?${decodeURIComponent(params.toString())}`
        }
        return `/ai/category/${resultSlug}`
      }

      case "search": {
        if ("filters" in rest) {
          const params = processFiltersToSearchParams(rest.filters!)
          return `/ai/search?${decodeURIComponent(params.toString())}`
        }
        return "/ai/search"
      }
    }
  },
})

// const searchFilterValues = createTool({
//   description: "Search for available filter values to apply",
//   parameters: z.object({
//     query: z.union([z.literal("vendor"), z.literal("flatOptions.Color")]),
//   }),
//   execute: async ({ query }) => {
//     console.log({ query, tool: "searchFilterValues" })
//     const results = await getFacetValues({
//       indexName: env.ALGOLIA_PRODUCTS_INDEX,
//       facetName: query,
//     })
//     return {
//       filterName: query,
//       availableFilterValues: results,
//     }
//   },
// })

// const addToCart = createTool({
//   description: "Add a product to the cart",
//   parameters: z.object({
//     productHandle: z.string(),
//     variantOptions: z.object({
//       color: z.string(),
//       material: z.string(),
//     }),
//   }),
//   execute: async ({ productHandle, variantOptions }) => {
//     const product = await getProduct(productHandle)
//     const variant = product?.variants.find((v) => v.selectedOptions.color.value === variantOptions.color && v.selectedOptions.material === variantOptions.material)!
//
// 		console.log({
// 			tool: "addToCart",
// 			variant,
// 			product,
// 			productHandle,
// 			variantOptions,
// 		});
//
// 		await addCartItem(null, variant.id, product?.id!);
//
//     return { ok: true }
//   },
// })

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
  navigateUser,
  // addToCart,
}
