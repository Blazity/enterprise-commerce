import { pageFragment } from "../fragments/page"

export const getPageQuery = `#graphql
  query SinglePage($handle: String!) {
    page(handle: $handle) {
      ...singlePage
    }
  }
  ${pageFragment}
`

export const getPagesQuery = `#graphql
  query Pages {
    pages(first: 100) {
      edges {
        node {
          ...singlePage
        }
      }
    }
  }
  ${pageFragment}
`
