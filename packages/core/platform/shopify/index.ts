import { AdminApiClient, createAdminApiClient } from "@shopify/admin-api-client"
import { createStorefrontApiClient, StorefrontApiClient } from "@shopify/storefront-api-client"

import { createCartItemMutation, createCartMutation, deleteCartItemsMutation, updateCartItemsMutation } from "./mutations/cart.storefront"
import { createProductFeedMutation, fullSyncProductFeedMutation } from "./mutations/product-feed.admin"
import { subscribeWebhookMutation } from "./mutations/webhook.admin"
import { normalizeCart, normalizeCollection, normalizeProduct } from "./normalize"
import { getCartQuery } from "./queries/cart.storefront"
import { getCollectionQuery, getCollectionsQuery } from "./queries/collection.storefront"
import { getMenuQuery } from "./queries/menu.storefront"
import { getPageQuery, getPagesQuery } from "./queries/page.storefront"
import { getLatestProductFeedQuery } from "./queries/product-feed.admin"
import { getAdminProductQuery, getProductStatusQuery } from "./queries/product.admin"
import { getProductQuery, getProductsByHandleQuery } from "./queries/product.storefront"

import type {
  LatestProductFeedsQuery,
  ProductFeedCreateMutation,
  ProductFullSyncMutation,
  ProductStatusQuery,
  SingleAdminProductQuery,
  WebhookSubscriptionCreateMutation,
} from "./types/admin/admin.generated"
import type { WebhookSubscriptionTopic } from "./types/admin/admin.types"
import type {
  CollectionsQuery,
  CreateCartItemMutation,
  CreateCartMutation,
  DeleteCartItemsMutation,
  MenuQuery,
  PagesQuery,
  ProductsByHandleQuery,
  SingleCartQuery,
  SingleCollectionQuery,
  SinglePageQuery,
  SingleProductQuery,
  UpdateCartItemsMutation,
} from "./types/storefront.generated"
import { CurrencyCode } from "./types/storefront.types"
import { PlatformCart, PlatformCollection, PlatformItemInput, PlatformMenu, PlatformPage, PlatformProduct, PlatformProductStatus } from "../types"

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
    getProductStatus: async (id: string) => getProductStatus(adminClient!, id),
    getAdminProduct: async (id: string) => getAdminProduct(adminClient, id),
    createCart: async (items: PlatformItemInput[]) => createCart(client!, items),
    createCartItem: async (cartId: string, items: PlatformItemInput[]) => createCartItem(client!,cartId, items),
    updateCartItem: async (cartId: string, items: PlatformItemInput[]) => updateCartItem(client!,cartId, items),
    deleteCartItem: async (cartId: string, itemIds: string[]) => deleteCartItem(client!, cartId, itemIds),
    getCart: async (cartId: string) => getCart(client!, cartId),
    getCollections: async (limit?: number) => getCollections(client!, limit),
    getCollection: async (handle: string) => getCollection(client!, handle),
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

async function getPage(client: StorefrontApiClient, handle: string): Promise<PlatformPage | undefined | null> {
  const page = await client.request<SinglePageQuery>(getPageQuery, { variables: { handle } })
  return page.data?.page
}

async function getAllPages(client: StorefrontApiClient): Promise<PlatformPage[] | null> {
  const pages = await client.request<PagesQuery>(getPagesQuery)

  return pages.data?.pages?.edges?.map((edge) => edge.node) || []
}

async function getProductStatus(client: AdminApiClient, id: string): Promise<PlatformProductStatus | undefined | null> {
  const status = await client.request<ProductStatusQuery>(getProductStatusQuery, { variables: { id } })

  return status.data?.product
}

async function createCart(client: StorefrontApiClient, items: PlatformItemInput[]): Promise<PlatformCart | undefined | null> {
  const cart = await client.request<CreateCartMutation>(createCartMutation, { variables: { items } })

  return normalizeCart(cart.data?.cartCreate?.cart)
}

async function createCartItem(client: StorefrontApiClient, cartId: string, items: PlatformItemInput[]): Promise<PlatformCart | undefined | null> {
  const cart = await client.request<CreateCartItemMutation>(createCartItemMutation, { variables: { cartId, items } })

  return normalizeCart(cart.data?.cartLinesAdd?.cart)
}

async function updateCartItem(client: StorefrontApiClient, cartId: string, items: PlatformItemInput[]): Promise<PlatformCart | undefined | null> {
  const cart = await client.request<UpdateCartItemsMutation>(updateCartItemsMutation, { variables: { cartId, items } })

  return normalizeCart(cart.data?.cartLinesUpdate?.cart)
}

async function deleteCartItem(client: StorefrontApiClient, cartId: string, itemIds: string[]): Promise<PlatformCart | undefined | null> {
  const cart = await client.request<DeleteCartItemsMutation>(deleteCartItemsMutation, { variables: { itemIds, cartId } })

  return normalizeCart(cart.data?.cartLinesRemove?.cart)
}

async function getCart(client: StorefrontApiClient, cartId: string): Promise<PlatformCart | undefined | null> {
  const cart = await client.request<SingleCartQuery>(getCartQuery, { variables: { cartId } })

  return normalizeCart(cart.data?.cart)
}

async function getCollections(client: StorefrontApiClient, limit?: number): Promise<PlatformCollection[] | undefined | null> {
  const collections = await client.request<CollectionsQuery>(getCollectionsQuery, { variables: { limit: limit || 250 } })

  return collections.data?.collections.edges.map((collection) => normalizeCollection(collection.node)).filter(Boolean) as PlatformCollection[]
}

async function getCollection(client: StorefrontApiClient, handle: string): Promise<PlatformCollection | undefined | null> {
  const collection = await client.request<SingleCollectionQuery>(getCollectionQuery, { variables: { handle } })

  return normalizeCollection(collection.data?.collection)
}

async function getAdminProduct(client: AdminApiClient, id: string) {
  const response = await client.request<SingleAdminProductQuery>(getAdminProductQuery, {
    variables: { id: id.startsWith("gid://shopify/Product/") ? id : `gid://shopify/Product/${id}` },
  })

  if (!response.data?.product) return null

  const variants = {
    edges: response.data?.product?.variants?.edges.map((edge) => ({ node: { ...edge.node, price: { amount: edge.node.price, currencyCode: "" as CurrencyCode } } })),
  }
  return normalizeProduct({ ...response.data?.product, variants })
}
