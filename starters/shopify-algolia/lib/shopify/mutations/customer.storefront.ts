export const createCustomerMutation = `#graphql
  mutation CreateCustomer($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customerUserErrors {
        code
        field
        message
      }
      customer {
        id
      }
    }
  }
`

export const updateCustomerMutation = `#graphql
  mutation UpdateCustomer($customer: CustomerUpdateInput!, $customerAccessToken: String!) {
    customerUpdate(customer: $customer, customerAccessToken: $customerAccessToken) {
      customerUserErrors {
        code
        field
        message
      }
      customer {
        id
      }
    }
  }
`

export const activateCustomerMutation = `#graphql
  mutation ActivateCustomer($id: ID!, $input: CustomerActivateInput!) {
    customerActivate(id: $id, input: $input) {
      customerUserErrors {
        code
        field
        message
      }
      customer {
        id
      }
    }
  }
`

export const createAccessTokenMutation = `#graphql
  mutation CreateAccessToken($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerUserErrors {
        code
        field
        message
      }
      customerAccessToken {
        accessToken
        expiresAt
      }
    }
  }
`
