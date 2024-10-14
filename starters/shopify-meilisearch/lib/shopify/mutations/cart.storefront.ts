import { cartFragment } from "../fragments/cart"

export const createCartItemMutation = `#graphql
  mutation CreateCartItem($cartId: ID!, $items: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $items) {
      cart {
        ...singleCart
      }
    }
  }
  ${cartFragment}
`

export const createCartMutation = `#graphql
  mutation CreateCart($items: [CartLineInput!]) {
    cartCreate(input: { lines: $items }) {
      cart {
        ...singleCart
      }
    }
  }
  ${cartFragment}
`

export const updateCartItemsMutation = `#graphql
  mutation UpdateCartItems($cartId: ID!, $items: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $items) {
      cart {
        ...singleCart
      }
    }
  }
  ${cartFragment}
`

export const deleteCartItemsMutation = `#graphql
  mutation DeleteCartItems($cartId: ID!, $itemIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $itemIds) {
      cart {
        ...singleCart
      }
    }
  }
  ${cartFragment}
`
