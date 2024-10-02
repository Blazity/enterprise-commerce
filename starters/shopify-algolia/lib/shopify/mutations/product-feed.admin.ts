export const createProductFeedMutation = `#graphql
  mutation ProductFeedCreate {
    productFeedCreate {
      productFeed {
        status
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`

export const fullSyncProductFeedMutation = `#graphql
  mutation productFullSync($id: ID!) {
    productFullSync(id: $id) {
      userErrors {
        field
        message
      }
    }
  }
`
