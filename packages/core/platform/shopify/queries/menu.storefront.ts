export const getMenuQuery = `#graphql
  query Menu($handle: String!) {
    menu(handle: $handle) {
      items {
        title
        url
      }
    }
  }
`
