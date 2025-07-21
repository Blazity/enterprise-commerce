import { PlatformMenu } from "../types"
import { createMenuItemFragment, menuItemFragment } from "../fragments/menu"

export type MenuQuery = {
  menu: {
    items: PlatformMenu["items"]
  }
}

export const getMenuQuery = (depth: number) => `#graphql
  query Menu($handle: String!) {
    menu(handle: $handle) {
      items {
        ${createMenuItemFragment(depth)}
      }
    }
  }
${menuItemFragment}
`
