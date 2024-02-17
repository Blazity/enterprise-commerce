import { imageFragment } from "./image"
import { seoFragment } from "./seo"

const productFragment = `#graphql
  fragment singleProduct on Product {
    id
    handle
    title
    description
    descriptionHtml
    options {
      id
      name
      values
    }
    priceRange {
      maxVariantPrice {
        amount
        currencyCode
      }
      minVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 250) {
      edges {
        node {
          id
          title
          availableForSale
          selectedOptions {
            name
            value
          }
          price {
            amount
            currencyCode
          }
        }
      }
    }
    featuredImage {
      ...singleImage
    }
    images(first: 20) {
      edges {
        node {
          ...singleImage
        }
      }
    }
    seo {
      ...seo
    }
    tags
    updatedAt
    createdAt
  }
  ${imageFragment}
  ${seoFragment}
`

export { productFragment }
