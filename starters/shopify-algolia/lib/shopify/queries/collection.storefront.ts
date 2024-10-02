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
  query Collections($limit: Int = 250) {
    collections(first: $limit, sortKey: TITLE) {
      edges {
        node {
          ...singleCollection
        }
      }
    }
  }
  ${collectionFragment}
`
