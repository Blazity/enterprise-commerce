"use server"

import { PlatformProduct } from "@enterprise-commerce/core/platform/types"
import { meilisearch } from "clients/meilisearch"
import { storefrontClient } from "clients/storefrontClient"
import { revalidateTag, unstable_cache } from "next/cache"
import { cookies } from "next/headers"
import { ComparisonOperators, FilterBuilder } from "utils/filterBuilder"

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

export const getCart = unstable_cache(async (cartId: string) => storefrontClient.getCart(cartId), ["cart"], { revalidate: 60 * 15, tags: ["cart"] })

export async function addCartItem(prevState: any, variantId: string) {
  if (!variantId) return { ok: false }

  const cookieName = "ecom_cartId"
  let cartId = cookies().get(cookieName)?.value
  let cart

  if (cartId) cart = await storefrontClient.getCart(cartId)

  if (!cartId || !cart) {
    cart = await storefrontClient.createCart([])
    cartId = cart.id
    cartId && cookies().set(cookieName, cartId)

    revalidateTag("cart")
  }

  const createCartItemResults = await storefrontClient.createCartItem(cartId!, [{ merchandiseId: variantId, quantity: 1 }])
  const cartItem = createCartItemResults?.items?.find((item) => item.merchandise.id === variantId)
  const hasAnyLeftInInventory = (cartItem?.quantity ?? 0) < (cartItem?.merchandise.quantityAvailable ?? Infinity)

  revalidateTag("cart")

  return { ok: hasAnyLeftInInventory }
}

export async function getItemAvailability(cartId: string | null | undefined, variantId: string | null | undefined) {
  if (!cartId || !variantId) return null

  const cart = await storefrontClient.getCart(cartId)
  const cartItem = cart?.items?.find((item) => item.merchandise.id === variantId)

  return { inCartQuantity: cartItem?.quantity ?? 0, inStockQuantity: cartItem?.merchandise.quantityAvailable ?? Infinity }
}

export async function removeCartItem(prevState: any, itemId: string) {
  const cartId = cookies().get("ecom_cartId")?.value

  if (!cartId) return null

  await storefrontClient.deleteCartItem(cartId!, [itemId])
  revalidateTag("cart")

  return {}
}

export async function updateItemQuantity(prevState: any, payload: { itemId: string; variantId: string; quantity: number }) {
  const cartId = cookies().get("ecom_cartId")?.value

  if (!cartId) return null

  const { itemId, variantId, quantity } = payload

  if (quantity === 0) {
    await storefrontClient.deleteCartItem(cartId, [itemId])
    revalidateTag("cart")
    return
  }

  await storefrontClient.updateCartItem(cartId, [{ id: itemId, merchandiseId: variantId, quantity }])
  revalidateTag("cart")
}
