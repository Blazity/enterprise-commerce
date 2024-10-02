import { productFragment } from "./product"

const cartFragment = `#graphql 
  fragment singleCart on Cart {
    id
    checkoutUrl
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
      totalTaxAmount {
        amount
        currencyCode
      }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
          merchandise {
            ... on ProductVariant {
              id
              title
              price {
                amount
                currencyCode
              }
              quantityAvailable
              selectedOptions {
                name
                value
              }
              product {
                ...singleProduct
              }
            }
          }
        }
      }
    }
    totalQuantity
  }
  ${productFragment}
`

export { cartFragment }
