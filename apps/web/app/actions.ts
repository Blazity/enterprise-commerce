"use server"

import { PlatformProduct } from "@enterprise-commerce/core/platform/types"
import { meilisearch } from "clients/meilisearch"
import { revalidateTag, unstable_cache } from "next/cache"
import { cookies } from "next/headers"
import { ComparisonOperators, FilterBuilder } from "utils/filterBuilder"
import { storefrontClient } from "clients/storefrontClient"

export const searchProducts = unstable_cache(
  async (query: string, limit: number = 4) => {
    const index = await meilisearch?.getIndex<PlatformProduct>("products")

    if (!index) return []

    return (await index?.search(query, { limit, attributesToRetrieve: ["id", "handle", "title"] })).hits
  },
  ["autocomplete-search"],
  { revalidate: 3600 }
)

export const getProduct = unstable_cache(
  async (handle: string) => {
    const index = await meilisearch?.getIndex<PlatformProduct>("products")
    const documents = await index?.getDocuments({ filter: new FilterBuilder().where("handle", ComparisonOperators.Equal, handle).build(), limit: 1 })
    return documents.results.find(Boolean) || null
  },
  ["product-by-handle"],
  { revalidate: 3600 }
)

export async function getCart() {
  const cookieName = "ecom_cartId"
  let cartId = cookies().get(cookieName)?.value

  if (!cartId) return null
  return storefrontClient.getCart(cartId)
}

export async function addCartItem(variantId: string) {
  if (!variantId) return null

  const cookieName = "ecom_cartId"
  let cartId = cookies().get(cookieName)?.value
  let cart

  if (cartId) cart = await storefrontClient.getCart(cartId)

  if (!cartId || !cart) {
    cart = await storefrontClient.createCart([])
    cartId = cart.id
    cartId && cookies().set(cookieName, cartId)
  }

  await storefrontClient.createCartItem(cartId!, [{ merchandiseId: variantId, quantity: 1 }])
}

export async function removeCartItem(lineId: string) {
  const cartId = cookies().get("ecom_cartId")?.value

  if (!cartId) return null

  await storefrontClient.deleteCartItem(cartId!, [lineId])
}

export async function updateItemQuantity(payload: { lineId: string; variantId: string; quantity: number }) {
  const cartId = cookies().get("ecom_cartId")?.value

  if (!cartId) return null

  const { lineId, variantId, quantity } = payload

  if (quantity === 0) {
    await storefrontClient.deleteCartItem(cartId, [lineId])
    return
  }

  await storefrontClient.updateCartItem(cartId, [{ id: lineId, merchandiseId: variantId, quantity }])
}
