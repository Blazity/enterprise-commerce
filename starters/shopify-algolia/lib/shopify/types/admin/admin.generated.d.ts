/* eslint-disable */
import * as AdminTypes from "./admin.types.d.ts"

export type ProductFeedCreateMutationVariables = AdminTypes.Exact<{ [key: string]: never }>

export type ProductFeedCreateMutation = {
  productFeedCreate?: AdminTypes.Maybe<{
    productFeed?: AdminTypes.Maybe<Pick<AdminTypes.ProductFeed, "status" | "id">>
    userErrors: Array<Pick<AdminTypes.ProductFeedCreateUserError, "field" | "message">>
  }>
}

export type ProductFullSyncMutationVariables = AdminTypes.Exact<{
  id: AdminTypes.Scalars["ID"]["input"]
}>

export type ProductFullSyncMutation = { productFullSync?: AdminTypes.Maybe<{ userErrors: Array<Pick<AdminTypes.ProductFullSyncUserError, "field" | "message">> }> }

export type WebhookSubscriptionCreateMutationVariables = AdminTypes.Exact<{
  topic: AdminTypes.WebhookSubscriptionTopic
  webhookSubscription: AdminTypes.WebhookSubscriptionInput
}>

export type WebhookSubscriptionCreateMutation = {
  webhookSubscriptionCreate?: AdminTypes.Maybe<{
    userErrors: Array<Pick<AdminTypes.UserError, "field" | "message">>
    webhookSubscription?: AdminTypes.Maybe<Pick<AdminTypes.WebhookSubscription, "id">>
  }>
}

export type LatestProductFeedsQueryVariables = AdminTypes.Exact<{ [key: string]: never }>

export type LatestProductFeedsQuery = { productFeeds: { nodes: Array<Pick<AdminTypes.ProductFeed, "id" | "country" | "status">> } }

export type SingleAdminProductQueryVariables = AdminTypes.Exact<{
  id: AdminTypes.Scalars["ID"]["input"]
}>

export type SingleAdminProductQuery = {
  product?: AdminTypes.Maybe<
    Pick<AdminTypes.Product, "id" | "handle" | "title" | "description" | "descriptionHtml" | "vendor" | "tags" | "updatedAt" | "createdAt"> & {
      options: Array<Pick<AdminTypes.ProductOption, "id" | "name" | "values">>
      collections: {
        nodes: Array<
          Pick<AdminTypes.Collection, "handle" | "title" | "descriptionHtml" | "id" | "description" | "updatedAt"> & {
            image?: AdminTypes.Maybe<Pick<AdminTypes.Image, "url" | "altText" | "width" | "height">>
            seo: Pick<AdminTypes.Seo, "title" | "description">
          }
        >
      }
      priceRange: { maxVariantPrice: Pick<AdminTypes.MoneyV2, "amount" | "currencyCode">; minVariantPrice: Pick<AdminTypes.MoneyV2, "amount" | "currencyCode"> }
      variants: {
        edges: Array<{
          node: Pick<AdminTypes.ProductVariant, "id" | "title" | "price" | "availableForSale"> & { selectedOptions: Array<Pick<AdminTypes.SelectedOption, "name" | "value">> }
        }>
      }
      featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, "url" | "altText" | "width" | "height">>
      images: { edges: Array<{ node: Pick<AdminTypes.Image, "url" | "altText" | "width" | "height"> }> }
      seo: Pick<AdminTypes.Seo, "title" | "description">
    }
  >
}

export type ProductStatusQueryVariables = AdminTypes.Exact<{
  id: AdminTypes.Scalars["ID"]["input"]
}>

export type ProductStatusQuery = { product?: AdminTypes.Maybe<Pick<AdminTypes.Product, "id" | "handle" | "status">> }

interface GeneratedQueryTypes {
  "#graphql\n  query LatestProductFeeds {\n    productFeeds(reverse: true, first: 1) {\n      nodes {\n        id\n        country\n        status\n      }\n    }\n  }\n": {
    return: LatestProductFeedsQuery
    variables: LatestProductFeedsQueryVariables
  }
  "#graphql\n  query SingleAdminProduct($id: ID!) {\n    product(id: $id) {\n      id\n      handle\n      title\n      description\n      descriptionHtml\n      vendor\n      options {\n        id\n        name\n        values\n      }\n      collections(first: 15) {\n        nodes {\n          handle\n          image {\n            url\n            altText\n            width\n            height\n          }\n          title\n          descriptionHtml\n          id\n          description\n          seo {\n            title\n            description\n          }\n          updatedAt \n        }\n      }\n      priceRange {\n        maxVariantPrice {\n          amount\n          currencyCode\n        }\n        minVariantPrice {\n          amount\n          currencyCode\n        }\n      }\n      variants(first: 250) {\n        edges {\n          node {\n            id\n            title\n            price\n            availableForSale\n            selectedOptions {\n              name\n              value\n            }\n          }\n        }\n      }\n      featuredImage {\n        url\n        altText\n        width\n        height\n      }\n      images(first: 20) {\n        edges {\n          node {\n            url\n            altText\n            width\n            height\n          }\n        }\n      }\n      seo {\n        title\n        description\n      }\n      tags\n      updatedAt\n      createdAt\n    }\n  }\n": {
    return: SingleAdminProductQuery
    variables: SingleAdminProductQueryVariables
  }
  "#graphql\n  query ProductStatus($id: ID!) {\n    product(id: $id) {\n      id\n      handle\n      status\n    }\n  }\n": {
    return: ProductStatusQuery
    variables: ProductStatusQueryVariables
  }
}

interface GeneratedMutationTypes {
  "#graphql\n  mutation ProductFeedCreate {\n    productFeedCreate {\n      productFeed {\n        status\n        id\n      }\n      userErrors {\n        field\n        message\n      }\n    }\n  }\n": {
    return: ProductFeedCreateMutation
    variables: ProductFeedCreateMutationVariables
  }
  "#graphql\n  mutation productFullSync($id: ID!) {\n    productFullSync(id: $id) {\n      userErrors {\n        field\n        message\n      }\n    }\n  }\n": {
    return: ProductFullSyncMutation
    variables: ProductFullSyncMutationVariables
  }
  "#graphql\n  mutation webhookSubscriptionCreate($topic: WebhookSubscriptionTopic!, $webhookSubscription: WebhookSubscriptionInput!) {\n    webhookSubscriptionCreate(topic: $topic, webhookSubscription: $webhookSubscription) {\n      userErrors {\n        field\n        message\n      }\n      webhookSubscription {\n        id\n      }\n    }\n  }\n": {
    return: WebhookSubscriptionCreateMutation
    variables: WebhookSubscriptionCreateMutationVariables
  }
}
declare module "@shopify/admin-api-client" {
  type InputMaybe<T> = AdminTypes.InputMaybe<T>
  interface AdminQueries extends GeneratedQueryTypes {}
  interface AdminMutations extends GeneratedMutationTypes {}
}
