import { collectionFragment } from "../fragments/collection"

export const getCollectionByIdQuery = `#graphql
  query SingleCollectionById($id: ID!) {
    collection(id: $id) {
      ...singleCollection
    }
  }
  ${collectionFragment}
`

export const getCollectionQuery = `#graphql
  query SingleCollection($handle: String!) {
    collection(handle: $handle) {
      ...singleCollection
    }
  }
  ${collectionFragment}
`

export const getCollectionsQuery = `#graphql
  query Collections($first: Int = 250, $after: String) {
    collections(first: $first, after: $after, sortKey: TITLE) {
      edges {
        node {
          ...singleCollection
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
  ${collectionFragment}
`
