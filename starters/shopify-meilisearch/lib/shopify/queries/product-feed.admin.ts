export const getLatestProductFeedQuery = `#graphql
  query LatestProductFeeds {
    productFeeds(reverse: true, first: 1) {
      nodes {
        id
        country
        status
      }
    }
  }
`
