"use server"

import { storefrontClient } from "clients/storefrontClient"
import { COOKIE_CART_ID, TAGS } from "constants/index"
import { revalidateTag, unstable_cache } from "next/cache"
import { cookies } from "next/headers"

export const getCart = unstable_cache(async (cartId: string) => storefrontClient.getCart(cartId), [TAGS.CART], { revalidate: 60 * 15, tags: [TAGS.CART] })

export async function addCartItem(prevState: any, variantId: string) {
  if (!variantId) return { ok: false }

  let cartId = cookies().get(COOKIE_CART_ID)?.value
  let cart

  if (cartId) cart = await storefrontClient.getCart(cartId)

  if (!cartId || !cart) {
    cart = await storefrontClient.createCart([])
    cartId = cart.id
    cartId && cookies().set(COOKIE_CART_ID, cartId)

    revalidateTag(TAGS.CART)
  }

  await storefrontClient.createCartItem(cartId!, [{ merchandiseId: variantId, quantity: 1 }])
  revalidateTag(TAGS.CART)

  return { ok: true }
}

export async function getItemAvailability(cartId: string | null | undefined, variantId: string | null | undefined) {
  if (!cartId || !variantId) return { inCartQuantity: 0, inStockQuantity: Infinity }

  const cart = await storefrontClient.getCart(cartId)
  const cartItem = cart?.items?.find((item) => item.merchandise.id === variantId)

  return { inCartQuantity: cartItem?.quantity ?? 0, inStockQuantity: cartItem?.merchandise.quantityAvailable ?? Infinity }
}

export async function removeCartItem(prevState: any, itemId: string) {
  const cartId = cookies().get(COOKIE_CART_ID)?.value

  if (!cartId) return null

  await storefrontClient.deleteCartItem(cartId!, [itemId])
  revalidateTag(TAGS.CART)
}

export async function updateItemQuantity(prevState: any, payload: { itemId: string; variantId: string; quantity: number }) {
  const cartId = cookies().get(COOKIE_CART_ID)?.value

  if (!cartId) return { ok: false }

  const { itemId, variantId, quantity } = payload

  if (quantity === 0) {
    await storefrontClient.deleteCartItem(cartId, [itemId])
    revalidateTag(TAGS.CART)
    return { ok: true }
  }

  const updatedItemResults = await storefrontClient.updateCartItem(cartId, [{ id: itemId, merchandiseId: variantId, quantity }])
  const cartItem = updatedItemResults?.items?.find((item) => item.merchandise.id === variantId)
  const hasAnyLeftInInventory = (cartItem?.quantity ?? 0) < (cartItem?.merchandise.quantityAvailable ?? Infinity)

  revalidateTag(TAGS.CART)
  return { ok: hasAnyLeftInInventory, message: "This product is out of stock" }
}
