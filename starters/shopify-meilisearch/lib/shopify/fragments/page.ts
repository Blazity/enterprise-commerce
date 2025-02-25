import { seoFragment } from "./seo"

const pageFragment = `#graphql
  fragment singlePage on Page {
    ... on Page {
      id
      title
      handle
      body
      bodySummary
      seo {
        ...seo
      }
      createdAt
      updatedAt
    }
  }
  ${seoFragment}
`

export { pageFragment }
