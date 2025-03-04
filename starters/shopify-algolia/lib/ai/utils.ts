import type { Message } from "ai"
import { ReadonlyURLSearchParams } from "next/navigation"
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
    categories: string
    filters: string
  }
  searchParams: ReadonlyURLSearchParams | null
}

export function createApplicationContext({ pathname, appContext, searchParams }: CreateContextArgs) {
  const pageType = getPageType(pathname)

  let context = `The user is currently viewing ${createPageTypeContext(pageType, pathname)}\n`

  switch (pageType) {
    case "category":
    case "search": {
      if (!!appContext.products.length) {
        context += `Product results that the user currently sees: ${appContext.products}\n`
      }
      if (!!appContext.categories.length) {
        context += `Categories that the user currently sees: ${appContext.categories}\n`
      }
      if (!!appContext.filters.length) {
        context += `Available filters that the user can apply: ${appContext.filters}\n`
      }
      if (searchParams && searchParams.toString().length > 0) {
        context += `Search parameters that are currently applied: ${searchParams?.toString()}`
      }

      return context
    }
    case "product": {
      if (!!appContext.products.length) {
        context += `Product that the user currently sees: ${appContext.products}\n`
      }
    }
    default:
      return context
  }
}
