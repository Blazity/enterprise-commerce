/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import * as AdminTypes from './admin.types.d.ts';

export type ProductFeedCreateMutationVariables = AdminTypes.Exact<{ [key: string]: never; }>;


export type ProductFeedCreateMutation = { productFeedCreate?: AdminTypes.Maybe<{ productFeed?: AdminTypes.Maybe<Pick<AdminTypes.ProductFeed, 'status' | 'id'>>, userErrors: Array<Pick<AdminTypes.ProductFeedCreateUserError, 'field' | 'message'>> }> };

export type ProductFullSyncMutationVariables = AdminTypes.Exact<{
  id: AdminTypes.Scalars['ID']['input'];
}>;


export type ProductFullSyncMutation = { productFullSync?: AdminTypes.Maybe<{ userErrors: Array<Pick<AdminTypes.ProductFullSyncUserError, 'field' | 'message'>> }> };

export type WebhookSubscriptionCreateMutationVariables = AdminTypes.Exact<{
  topic: AdminTypes.WebhookSubscriptionTopic;
  webhookSubscription: AdminTypes.WebhookSubscriptionInput;
}>;


export type WebhookSubscriptionCreateMutation = { webhookSubscriptionCreate?: AdminTypes.Maybe<{ userErrors: Array<Pick<AdminTypes.UserError, 'field' | 'message'>>, webhookSubscription?: AdminTypes.Maybe<Pick<AdminTypes.WebhookSubscription, 'id'>> }> };

export type LatestProductFeedsQueryVariables = AdminTypes.Exact<{ [key: string]: never; }>;


export type LatestProductFeedsQuery = { productFeeds: { nodes: Array<Pick<AdminTypes.ProductFeed, 'id' | 'country' | 'status'>> } };

interface GeneratedQueryTypes {
  "#graphql\n  query LatestProductFeeds {\n    productFeeds(reverse: true, first: 1) {\n      nodes {\n        id\n        country\n        status\n      }\n    }\n  }\n": {return: LatestProductFeedsQuery, variables: LatestProductFeedsQueryVariables},
}

interface GeneratedMutationTypes {
  "#graphql\n  mutation ProductFeedCreate {\n    productFeedCreate {\n      productFeed {\n        status\n        id\n      }\n      userErrors {\n        field\n        message\n      }\n    }\n  }\n": {return: ProductFeedCreateMutation, variables: ProductFeedCreateMutationVariables},
  "#graphql\n  mutation productFullSync($id: ID!) {\n    productFullSync(id: $id) {\n      userErrors {\n        field\n        message\n      }\n    }\n  }\n": {return: ProductFullSyncMutation, variables: ProductFullSyncMutationVariables},
  "#graphql\n  mutation webhookSubscriptionCreate($topic: WebhookSubscriptionTopic!, $webhookSubscription: WebhookSubscriptionInput!) {\n    webhookSubscriptionCreate(topic: $topic, webhookSubscription: $webhookSubscription) {\n      userErrors {\n        field\n        message\n      }\n      webhookSubscription {\n        id\n      }\n    }\n  }\n": {return: WebhookSubscriptionCreateMutation, variables: WebhookSubscriptionCreateMutationVariables},
}
declare module '@shopify/admin-api-client' {
  type InputMaybe<T> = AdminTypes.InputMaybe<T>;
  interface AdminQueries extends GeneratedQueryTypes {}
  interface AdminMutations extends GeneratedMutationTypes {}
}
