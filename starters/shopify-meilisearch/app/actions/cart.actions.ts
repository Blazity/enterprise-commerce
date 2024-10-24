"use server"

import { unstable_cacheTag as cacheTag, unstable_cacheLife as cacheLife } from "next/cache"
import { cookies } from "next/headers"
import { storefrontClient } from "clients/storefrontClient"
import { COOKIE_CART_ID, TAGS } from "constants/index"
import { isDemoMode } from "utils/demo-utils"

export const getCart = async (cartId: string) => {
  return storefrontClient.getCart(cartId)
}

export async function addCartItem(prevState: any, variantId: string) {
  if (isDemoMode()) return { ok: false, message: "Demo mode active. Filtering, searching, and adding to cart disabled." }
  if (!variantId) return { ok: false }

  const cookieStore = await cookies()
  let cartId = cookieStore.get(COOKIE_CART_ID)?.value
  let cart

  if (cartId) cart = await storefrontClient.getCart(cartId)

  if (!cartId || !cart) {
    cart = await storefrontClient.createCart([])
    cartId = cart?.id
    if (cartId) {
      await cookieStore.set(COOKIE_CART_ID, cartId)
      cacheTag(TAGS.CART)
    }
  }

  const itemAvailability = await getItemAvailability(cartId, variantId)

  if (!itemAvailability || itemAvailability.inCartQuantity >= itemAvailability.inStockQuantity)
    return {
      ok: false,
      message: "This product is out of stock",
    }

  await storefrontClient.createCartItem(cartId!, [{ merchandiseId: variantId, quantity: 1 }])
  cacheTag(TAGS.CART)

  return { ok: true }
}

export async function getItemAvailability(cartId: string | null | undefined, variantId: string | null | undefined) {
  if (!cartId || !variantId) return { inCartQuantity: 0, inStockQuantity: Infinity }

  const cart = await storefrontClient.getCart(cartId)
  const cartItem = cart?.items?.find((item) => item.merchandise.id === variantId)

  return { inCartQuantity: cartItem?.quantity ?? 0, inStockQuantity: cartItem?.merchandise.quantityAvailable ?? Infinity }
}

export async function removeCartItem(prevState: any, itemId: string) {
  const cookieStore = await cookies()
  const cartId = cookieStore.get(COOKIE_CART_ID)?.value

  if (!cartId) return { ok: false }

  await storefrontClient.deleteCartItem(cartId!, [itemId])
  cacheTag(TAGS.CART)

  return { ok: true }
}

export async function updateItemQuantity(prevState: any, payload: { itemId: string; variantId: string; quantity: number }) {
  const cookieStore = await cookies()
  const cartId = cookieStore.get(COOKIE_CART_ID)?.value

  if (!cartId) return { ok: false }

  const { itemId, variantId, quantity } = payload

  if (quantity === 0) {
    await storefrontClient.deleteCartItem(cartId, [itemId])
    cacheTag(TAGS.CART)
    return { ok: true }
  }

  const itemAvailability = await getItemAvailability(cartId, variantId)
  if (!itemAvailability || quantity > itemAvailability.inStockQuantity)
    return {
      ok: false,
      message: "This product is out of stock",
    }

  await storefrontClient.updateCartItem(cartId, [{ id: itemId, merchandiseId: variantId, quantity }])

  cacheTag(TAGS.CART)
  return { ok: true }
}
