import type { Message } from "ai"
import { PlatformCollection } from "lib/shopify/types"
import { ReadonlyURLSearchParams } from "next/navigation"
import type { CartStore } from "stores/cart-store"
import { CommerceProduct } from "types"
import { slugToName } from "utils/slug-name"

export function getMostRecentUserMessage(messages: Array<Message>) {
  const userMessages = messages.filter((message) => message.role === "user")
  return userMessages.at(-1)
}

function getPageType(pathname: string) {
  const [_, pageType] = pathname.split("/").filter(Boolean)
  switch (pageType) {
    case "category":
      return "category"
    case "product":
      return "product"
    default:
      return "search"
  }
}

function createPageTypeContext(pageType: "category" | "product" | "search", pathname: string) {
  const [_, __, slug] = pathname.split("/").filter(Boolean)
  switch (pageType) {
    case "category":
      return `${slugToName(slug)} Category Page`
    case "product":
      return `${slugToName(slug)} Product Details Page`
    default:
      return "Search Results Page"
  }
}

type CreateContextArgs = {
  pathname: string
  appContext: {
    products: string
    similarProducts: string
    categories: string
    availableFilters: string
    cart: CartStore["cart"]
  }
  searchParams: ReadonlyURLSearchParams | null
}

export function createApplicationContext({ pathname, appContext, searchParams }: CreateContextArgs) {
  const pageType = getPageType(pathname)

  let context = `The user is currently viewing ${createPageTypeContext(pageType, pathname)}\n`

  if (!!appContext.cart) {
    context += `The user's cart: ${JSON.stringify(appContext.cart)}\n`
    context += `The user's checkout URL: ${appContext.cart.checkoutUrl}\n`
  }

  switch (pageType) {
    case "category":
    case "search": {
      if (!!appContext.products.length) {
        context += `Product results that the user currently sees: ${appContext.products}\n`
      }
      if (!!appContext.categories.length) {
        context += `Categories that the user currently sees: ${appContext.categories}\n`
      }
      if (!!appContext.availableFilters.length) {
        context += `Available filters that the user can apply: ${appContext.availableFilters}\n`
      }
      if (searchParams && searchParams.toString().length > 0) {
        context += `Search parameters that are currently applied: ${searchParams?.toString()}`
      }
    }
    case "product":
      {
        if (!!appContext.products.length) {
          context += `Product that the user currently sees: ${appContext.products}\n\n`
        }
        if (!!appContext.similarProducts.length) {
          context += `Similar products: ${appContext.similarProducts}\n\n`
        }
      }

      return context
  }
}

export function normalizeProductsContext(products: CommerceProduct[]) {
  return products.map((product) => {
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      tags: product.tags,
      vendor: product.vendor,
      minPrice: product.minPrice,
      collections: product.collections,
      variants: product.variants,
      featuredImage: product.featuredImage,
    }
  })
}

export function normalizeCategoriesContext(categories: PlatformCollection[]) {
  return categories.map((category) => {
    return {
      id: category.id,
      title: category.title,
      description: category.description,
    }
  })
}
