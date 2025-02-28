import type { Message } from "ai"
import { slugToName } from "utils/slug-name"

export function getMostRecentUserMessage(messages: Array<Message>) {
  const userMessages = messages.filter((message) => message.role === "user")
  return userMessages.at(-1)
}

export function createPageTypeFromPathname(pathname: string) {
  const [_, pageType, slug] = pathname.split("/").filter(Boolean)
  switch (pageType) {
    case "category":
      return `${slugToName(slug)} Category Page`
    case "product":
      return `${slugToName(slug)} Product Details Page`
    default:
      return "Search Results Page"
  }
}
