import { cartFragment } from "../fragments/cart"

export const addToCartMutation = `#graphql
  mutation CreateCartLine($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...singleCart
      }
    }
  }
  ${cartFragment}
`

export const createCartMutation = `#graphql
  mutation CreateCart($lineItems: [CartLineInput!]) {
    cartCreate(input: { lines: $lineItems }) {
      cart {
        ...singleCart
      }
    }
  }
  ${cartFragment}
`

export const editCartItemsMutation = `#graphql
  mutation EditCartLine($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...singleCart
      }
    }
  }
  ${cartFragment}
`

export const removeFromCartMutation = `#graphql
  mutation RemoveCartLine($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...singleCart
      }
    }
  }
  ${cartFragment}
`
