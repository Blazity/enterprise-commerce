import nodeFetch from "node-fetch"
import { createStorefrontApiClient, StorefrontApiClient } from "@shopify/storefront-api-client"
import { createAdminApiClient, AdminApiClient } from "@shopify/admin-api-client"

import { getMenuQuery } from "./queries/menu"
import { getLatestProductFeedQuery } from "./queries/product-feed.admin"
import { getProductQuery, getProductsByHandleQuery } from "./queries/product"
import { subscribeWebhookMutation } from "./mutations/webhook.admin"
import { createProductFeedMutation, fullSyncProductFeedMutation } from "./mutations/product-feed.admin"

import type { WebhookSubscriptionTopic } from "../../../../types/admin/admin.types"
import type { MenuQuery, ProductsByHandleQuery, ProductsQuery } from "../../../../types/storefront.generated"
import type { LatestProductFeedsQuery, ProductFeedCreateMutation, ProductFullSyncMutation, WebhookSubscriptionCreateMutation } from "../../../../types/admin/admin.generated"

interface CreateShopifyClientProps {
  storeDomain: string
  storefrontAccessToken: string
  adminAccessToken?: string
}

export function createShopifyClient({ storefrontAccessToken, adminAccessToken, storeDomain }: CreateShopifyClientProps) {
  const client = createStorefrontApiClient({
    storeDomain,
    privateAccessToken: storefrontAccessToken,
    apiVersion: "2024-01",
    customFetchApi: (url, init) => nodeFetch(url, init as never) as never,
  })

  const adminClient = createAdminApiClient({
    storeDomain,
    accessToken: adminAccessToken || "",
    apiVersion: "2024-01",
  })

  // To prevent prettier from wrapping pretty one liners and making them unreadable
  // prettier-ignore
  return {
    getMenu: async (handle?: string) => getMenu(client, handle),
    getProduct: async (id: string) => getProduct(client, id),
    getProductsByHandle: async (handle: string) => getProductsByHandle(client, handle),
    subscribeWebhook: async (topic: `${WebhookSubscriptionTopic}`, callbackUrl: string) => subscribeWebhook(adminClient, topic, callbackUrl),
    createProductFeed: async () => createProductFeed(adminClient),
    fullSyncProductFeed: async (id: string) => fullSyncProductFeed(adminClient, id),
    getLatestProductFeed: async () => getLatestProductFeed(adminClient),
  }
}

async function getMenu(client: StorefrontApiClient, handle: string = "main-menu") {
  return client.request<MenuQuery>(getMenuQuery, { variables: { handle } })
}

async function getProduct(client: StorefrontApiClient, handle: string) {
  return client.request<ProductsQuery>(getProductQuery, { variables: { id: handle } })
}

async function getProductsByHandle(client: StorefrontApiClient, handle: string) {
  return client.request<ProductsByHandleQuery>(getProductsByHandleQuery, { variables: { query: `'${handle}'` } })
}

async function subscribeWebhook(client: AdminApiClient, topic: `${WebhookSubscriptionTopic}`, callbackUrl: string) {
  return client.request<WebhookSubscriptionCreateMutation>(subscribeWebhookMutation, {
    variables: {
      topic: topic,
      webhookSubscription: {
        callbackUrl: callbackUrl,
        format: "JSON",
      },
    },
  })
}

async function createProductFeed(client: AdminApiClient) {
  return client.request<ProductFeedCreateMutation>(createProductFeedMutation)
}

async function fullSyncProductFeed(client: AdminApiClient, id: string) {
  return client.request<ProductFullSyncMutation>(fullSyncProductFeedMutation, { variables: { id } })
}

async function getLatestProductFeed(client: AdminApiClient) {
  return client.request<LatestProductFeedsQuery>(getLatestProductFeedQuery)
}
