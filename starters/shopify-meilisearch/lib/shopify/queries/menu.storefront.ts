import { PlatformMenu } from "../types"
import { createMenuItemFragment, menuItemFragment } from "../fragments/menu"
/* Not using auto generated types here, as I'm either too bad using codegen-cli or it just does not work for such code */

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
