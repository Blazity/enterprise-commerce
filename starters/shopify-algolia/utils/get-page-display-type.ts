import { navigationItems } from "./nav-items"
import type { NavItem } from "components/navigation-bar/types"

export function getPageDisplayTypeByHandle(handle: string): "CLP" | "PLP" {
  const slug = `/category/${handle}`

  function findPageDisplayType(items: NavItem[]): "CLP" | "PLP" | undefined {
    for (const item of items) {
      if (item.href === slug) {
        return item.pageDisplayType
      }

      if (item.submenu?.items) {
        const found = findPageDisplayType(item.submenu.items as NavItem[])
        if (found !== undefined) {
          return found
        }
      }

      if ("items" in item && Array.isArray(item.items)) {
        const found = findPageDisplayType(item.items as NavItem[])
        if (found !== undefined) {
          return found
        }
      }
    }

    return undefined
  }

  const pageDisplayType = findPageDisplayType(navigationItems)
  return pageDisplayType || "PLP"
}
