import { customerFragment } from "../fragments/customer"

export const getCustomerQuery = `#graphql
  query SingleCustomer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      ...singleCustomer
    }
  }
  ${customerFragment}
`
