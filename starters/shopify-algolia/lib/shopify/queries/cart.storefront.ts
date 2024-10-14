import { cartFragment } from "../fragments/cart"

export const getCartQuery = `#graphql
  query SingleCart($cartId: ID!) {
    cart(id: $cartId) {
      ...singleCart
    }
  }
  ${cartFragment}
`
