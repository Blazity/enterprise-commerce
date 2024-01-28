import { collectionFragment } from "../fragments/collection"
import { productFragment } from "../fragments/product"

export const getCollectionQuery = `#graphql
  query SingleCollection($handle: String!) {
    collection(handle: $handle) {
      ...singleCollection
    }
  }
  ${collectionFragment}
`

export const getCollectionsQuery = `#graphql
  query Collections {
    collections(first: 100, sortKey: TITLE) {
      edges {
        node {
          ...singleCollection
        }
      }
    }
  }
  ${collectionFragment}
`

export const getCollectionProductsQuery = `#graphql
  query CollectionProducts($handle: String!, $sortKey: ProductCollectionSortKeys, $reverse: Boolean) {
    collection(handle: $handle) {
      products(sortKey: $sortKey, reverse: $reverse, first: 100) {
        edges {
          node {
            ...singleProduct
          }
        }
      }
    }
  }
  ${productFragment}
`
