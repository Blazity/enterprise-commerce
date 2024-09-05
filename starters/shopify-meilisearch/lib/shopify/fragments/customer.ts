const customerFragment = `#graphql 
  fragment singleCustomer on Customer {
    acceptsMarketing
    createdAt
    updatedAt
    displayName
    email
    firstName
    lastName
    id
    phone
    tags
  }
`

export { customerFragment }
