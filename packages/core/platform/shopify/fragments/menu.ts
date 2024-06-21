const menuItemFragment = `#graphql
fragment NavigationItemFields on MenuItem {
	title
	id
    resource {
        __typename
        ... on Collection {
            handle
        }
    }
}
`

const createMenuItemFragment = (depth: number): string => {
  if (depth <= 0) {
    return `#graphql
      ...NavigationItemFields
        `
  }
  return `#graphql
      ...NavigationItemFields
        items {
            ${createMenuItemFragment(depth - 1)}
        }
    `
}

export { menuItemFragment, createMenuItemFragment }
