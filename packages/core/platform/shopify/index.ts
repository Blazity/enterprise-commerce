import { StorefrontApiClient, createStorefrontApiClient } from "@shopify/storefront-api-client"
import nodeFetch from "node-fetch"

import { getMenuQuery } from "./queries/menu"
import { getProductsByHandleQuery, getProductQuery } from "./queries/product"

import { MenuQuery, ProductsByHandleQuery, ProductsQuery } from "../../../../types/storefront.generated"

interface CreateShopifyClientProps {
  storeDomain: string
  accessToken: string
}

export function createShopifyClient({ accessToken, storeDomain }: CreateShopifyClientProps) {
  const client = createStorefrontApiClient({
    storeDomain,
    privateAccessToken: accessToken,
    apiVersion: "2024-01",
    customFetchApi: (url, init) => nodeFetch(url, init) as never,
  })

  return {
    getMenu: async (handle?: string) => getMenu(client, handle),
    getProduct: async (id: string) => getProduct(client, id),
    getProductsByHandle: async (handle: string) => getProductsByHandle(client, handle),
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
