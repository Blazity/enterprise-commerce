/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import * as AdminTypes from './admin.types.d.ts';

export type ProductFeedCreateMutationVariables = AdminTypes.Exact<{ [key: string]: never; }>;


export type ProductFeedCreateMutation = { productFeedCreate?: AdminTypes.Maybe<{ productFeed?: AdminTypes.Maybe<Pick<AdminTypes.ProductFeed, 'status'>>, userErrors: Array<Pick<AdminTypes.ProductFeedCreateUserError, 'field' | 'message'>> }> };

interface GeneratedQueryTypes {
}

interface GeneratedMutationTypes {
  "#graphql\n  mutation productFeedCreate {\n    productFeedCreate {\n      productFeed {\n        status\n      }\n      userErrors {\n        field\n        message\n      }\n    }\n  }\n": {return: ProductFeedCreateMutation, variables: ProductFeedCreateMutationVariables},
}
declare module '@shopify/admin-api-client' {
  type InputMaybe<T> = AdminTypes.InputMaybe<T>;
  interface AdminQueries extends GeneratedQueryTypes {}
  interface AdminMutations extends GeneratedMutationTypes {}
}
