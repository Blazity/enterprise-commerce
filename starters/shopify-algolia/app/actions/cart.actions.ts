"use server"

import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { COOKIE_CART_ID, TAGS } from "constants/index"
import { isDemoMode } from "utils/demo-utils"
import { createCart, createCartItem, deleteCartItem, getCart, getProduct, updateCartItem } from "lib/shopify"

export async function getOrCreateCart() {
  const cartId = cookies().get(COOKIE_CART_ID)?.value
  const cart = cartId ? await getCart(cartId) : await createCart()

  if (!cartId) {
    const newCartId = cart?.id
    if (newCartId) {
      cookies().set(COOKIE_CART_ID, newCartId)
      revalidateTag(TAGS.CART)
    }
  }

  return { cartId: cart?.id, cart }
}

export async function getItemAvailability({
  cartId,
  variantId,
  productId,
}: {
  cartId: string | null | undefined
  variantId: string | null | undefined
  productId: string | null | undefined
}) {
  if (!variantId) {
    return { inCartQuantity: 0, inStockQuantity: 0 }
  }

  if (!cartId) {
    const product = await getProduct(productId!)
    const inStockQuantity = product?.variants?.find((variant) => variant.id === variantId)?.quantityAvailable ?? Infinity
    return {
      inCartQuantity: 0,
      inStockQuantity,
    }
  }

  const cart = await getCart(cartId)
  const cartItem = cart?.items?.find((item) => item.merchandise.id === variantId)

  return {
    inCartQuantity: cartItem?.quantity ?? 0,
    inStockQuantity: cartItem?.merchandise.quantityAvailable ?? Infinity,
  }
}

export async function addCartItem(prevState: any, variantId: string, productId: string) {
  if (isDemoMode()) {
    return {
      ok: false,
      message: "Demo mode active. Filtering, searching, and adding to cart disabled.",
    }
  }

  if (!variantId) return { ok: false }

  const { cartId } = await getOrCreateCart()

  if (!cartId) return { ok: false }

  const availability = await getItemAvailability({ cartId, variantId, productId })
  if (!availability || availability.inCartQuantity >= availability.inStockQuantity) {
    return {
      ok: false,
      message: "This product is out of stock",
    }
  }

  await createCartItem(cartId, [{ merchandiseId: variantId, quantity: 1 }])
  revalidateTag(TAGS.CART)

  return { ok: true }
}

export async function removeCartItem(prevState: any, itemId: string) {
  const cartId = cookies().get(COOKIE_CART_ID)?.value
  if (!cartId) return { ok: false }

  await deleteCartItem(cartId, [itemId])
  revalidateTag(TAGS.CART)

  return { ok: true }
}

export async function updateItemQuantity(prevState: any, payload: { itemId: string; variantId: string; quantity: number; productId: string }) {
  const cartId = cookies().get(COOKIE_CART_ID)?.value
  if (!cartId) return { ok: false }

  const { itemId, variantId, quantity, productId } = payload

  if (quantity === 0) {
    await deleteCartItem(cartId, [itemId])
    revalidateTag(TAGS.CART)
    return { ok: true }
  }

  const itemAvailability = await getItemAvailability({ cartId, variantId, productId })
  if (!itemAvailability || quantity > itemAvailability.inStockQuantity) {
    return {
      ok: false,
      message: "This product is out of stock",
    }
  }

  await updateCartItem(cartId, [{ id: itemId, merchandiseId: variantId, quantity }])
  revalidateTag(TAGS.CART)

  return { ok: true }
}
