import { createMenuItemFragment, menuItemFragment } from "../fragments/menu"

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
