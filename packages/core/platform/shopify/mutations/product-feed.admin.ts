export const createProductFeed = `#graphql
  mutation productFeedCreate {
    productFeedCreate {
      productFeed {
        status
      }
      userErrors {
        field
        message
      }
    }
  }
`
