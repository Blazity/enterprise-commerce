import { seoFragment } from "./seo"

const collectionFragment = `#graphql
  fragment singleCollection on Collection {
    handle
    title
    description
    seo {
      ...seo
    }
    updatedAt
  }
  ${seoFragment}
`

export { collectionFragment }
