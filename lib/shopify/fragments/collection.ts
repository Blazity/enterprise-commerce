import { imageFragment } from "./image"
import { seoFragment } from "./seo"

const collectionFragment = `#graphql
  fragment singleCollection on Collection {
    handle
    image {
      ...singleImage
    }
    title
    descriptionHtml
    id
    description
    seo {
      ...seo
    }
    updatedAt
  }
  ${seoFragment}
  ${imageFragment}
`

export { collectionFragment }
