import { AdminApiClient, createAdminApiClient } from "@shopify/admin-api-client"
import { createStorefrontApiClient, StorefrontApiClient } from "@shopify/storefront-api-client"

import { createProductFeedMutation, fullSyncProductFeedMutation } from "./mutations/product-feed.admin"
import { subscribeWebhookMutation } from "./mutations/webhook.admin"
import { normalizeProduct } from "./normalize"
import { getMenuQuery } from "./queries/menu.storefront"
import { getPageQuery, getPagesQuery } from "./queries/page.storefront"
import { getLatestProductFeedQuery } from "./queries/product-feed.admin"
import { getProductQuery, getProductsByHandleQuery } from "./queries/product.storefront"

import type {
  LatestProductFeedsQuery,
  ProductFeedCreateMutation,
  ProductFullSyncMutation,
  SingleAdminProductQuery,
  WebhookSubscriptionCreateMutation,
} from "./types/admin/admin.generated"
import type { WebhookSubscriptionTopic } from "./types/admin/admin.types"
import type { MenuQuery, PagesQuery, ProductsByHandleQuery, SinglePageQuery, SingleProductQuery } from "./types/storefront.generated"
import { PlatformMenu, PlatformProduct } from "../types"
import { getAdminProductQuery } from "./queries/product.admin"

interface CreateShopifyClientProps {
  storeDomain: string
  storefrontAccessToken?: string
  adminAccessToken?: string
}

export function createShopifyClient({ storefrontAccessToken, adminAccessToken, storeDomain }: CreateShopifyClientProps) {
  const client = createStorefrontApiClient({
    storeDomain,
    privateAccessToken: storefrontAccessToken || "_BOGUS_TOKEN_",
    apiVersion: "2024-01",
    customFetchApi: (url, init) => fetch(url, init as never) as never,
  })

  const adminClient = createAdminApiClient({
    storeDomain,
    accessToken: adminAccessToken || "",
    apiVersion: "2024-01",
  })

  // To prevent prettier from wrapping pretty one liners and making them unreadable
  // prettier-ignore
  return {
    getMenu: async (handle?: string) => getMenu(client!, handle),
    getProduct: async (id: string) => getProduct(client!, id),
    getProductByHandle: async (handle: string) => getProductByHandle(client!, handle),
    subscribeWebhook: async (topic: `${WebhookSubscriptionTopic}`, callbackUrl: string) => subscribeWebhook(adminClient, topic, callbackUrl),
    createProductFeed: async () => createProductFeed(adminClient),
    fullSyncProductFeed: async (id: string) => fullSyncProductFeed(adminClient, id),
    getLatestProductFeed: async () => getLatestProductFeed(adminClient),
    getPage: async (handle: string) => getPage(client!, handle),
    getAllPages: async () => getAllPages(client!),
    getAdminProduct: async (id: string) => getAdminProduct(adminClient, id),
  }
}

async function getMenu(client: StorefrontApiClient, handle: string = "main-menu"): Promise<PlatformMenu> {
  const response = await client.request<MenuQuery>(getMenuQuery, { variables: { handle } })
  const mappedItems = response.data?.menu?.items?.map((item) => ({
    title: item.title,
    url: item.url,
  }))

  return {
    items: mappedItems || [],
  }
}

async function getProduct(client: StorefrontApiClient, id: string): Promise<PlatformProduct | null> {
  const response = await client.request<SingleProductQuery>(getProductQuery, { variables: { id } })
  const product = response.data?.product

  return normalizeProduct(product)
}

async function getProductByHandle(client: StorefrontApiClient, handle: string) {
  const response = await client.request<ProductsByHandleQuery>(getProductsByHandleQuery, { variables: { query: `'${handle}'` } })
  const product = response.data?.products?.edges?.find(Boolean)?.node

  return normalizeProduct(product)
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

async function getPage(client: StorefrontApiClient, handle: string) {
  return client.request<SinglePageQuery>(getPageQuery, { variables: { handle } })
}

async function getAllPages(client: StorefrontApiClient) {
  return client.request<PagesQuery>(getPagesQuery)
}

async function getAdminProduct(client: AdminApiClient, id: string) {
  return client.request<SingleAdminProductQuery>(getAdminProductQuery, { variables: { id } })
}
