"use server"

import { PlatformProduct, PlatformUserCreateInput } from "@enterprise-commerce/core/platform/types"
import { meilisearch } from "clients/meilisearch"
import { storefrontClient } from "clients/storefrontClient"
import { revalidateTag, unstable_cache } from "next/cache"
import { cookies } from "next/headers"
import { ComparisonOperators, FilterBuilder } from "utils/filterBuilder"
import { COOKIE_ACCESS_TOKEN, COOKIE_CART_ID, MEILISEARCH_INDEX } from "constants/index"

export const searchProducts = unstable_cache(
  async (query: string, limit: number = 4) => {
    const index = await meilisearch?.getIndex<PlatformProduct>(MEILISEARCH_INDEX)

    if (!index) return []

    return (await index?.search(query, { limit, attributesToRetrieve: ["id", "handle", "title"] })).hits
  },
  ["autocomplete-search"],
  { revalidate: 3600 }
)

export const getProduct = unstable_cache(
  async (handle: string) => {
    const index = await meilisearch?.getIndex<PlatformProduct>(MEILISEARCH_INDEX)
    const documents = await index?.getDocuments({ filter: new FilterBuilder().where("handle", ComparisonOperators.Equal, handle).build(), limit: 1 })
    return documents.results.find(Boolean) || null
  },
  ["product-by-handle"],
  { revalidate: 3600 }
)

export const getCart = unstable_cache(async (cartId: string) => storefrontClient.getCart(cartId), ["cart"], { revalidate: 60 * 15, tags: ["cart"] })

export async function addCartItem(prevState: any, variantId: string) {
  if (!variantId) return { ok: false }

  let cartId = cookies().get(COOKIE_CART_ID)?.value
  let cart

  if (cartId) cart = await storefrontClient.getCart(cartId)

  if (!cartId || !cart) {
    cart = await storefrontClient.createCart([])
    cartId = cart.id
    cartId && cookies().set(COOKIE_CART_ID, cartId)

    revalidateTag("cart")
  }

  await storefrontClient.createCartItem(cartId!, [{ merchandiseId: variantId, quantity: 1 }])
  revalidateTag("cart")

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
  revalidateTag("cart")
}

export async function updateItemQuantity(prevState: any, payload: { itemId: string; variantId: string; quantity: number }) {
  const cartId = cookies().get(COOKIE_CART_ID)?.value

  if (!cartId) return { ok: false }

  const { itemId, variantId, quantity } = payload

  if (quantity === 0) {
    await storefrontClient.deleteCartItem(cartId, [itemId])
    revalidateTag("cart")
    return { ok: true }
  }

  const updatedItemResults = await storefrontClient.updateCartItem(cartId, [{ id: itemId, merchandiseId: variantId, quantity }])
  const cartItem = updatedItemResults?.items?.find((item) => item.merchandise.id === variantId)
  const hasAnyLeftInInventory = (cartItem?.quantity ?? 0) < (cartItem?.merchandise.quantityAvailable ?? Infinity)

  revalidateTag("cart")
  return { ok: hasAnyLeftInInventory, message: "This product is out of stock" }
}

export async function signupUser({ email, password }: { email: string; password: string }) {
  const user = await storefrontClient.createUser({ email, password })
  return user
}

export async function loginUser({ email, password }: { email: string; password: string }) {
  const user = await storefrontClient.createUserAccessToken({ email, password })
  cookies().set(COOKIE_ACCESS_TOKEN, user?.accessToken || "", { expires: new Date(user?.expiresAt || "") })
  return user
}

export async function updateUser(input: Pick<PlatformUserCreateInput, "firstName" | "lastName" | "phone">) {
  const accessToken = cookies().get(COOKIE_ACCESS_TOKEN)?.value

  const user = await storefrontClient.updateUser(accessToken!, { ...input })
  return user
}

export async function logoutUser() {
  cookies().delete(COOKIE_ACCESS_TOKEN)
}

export const getPage = unstable_cache(async (handle: string) => await storefrontClient.getPage(handle), ["page"], { revalidate: 3600 })

export const getAllPages = unstable_cache(async () => await storefrontClient.getAllPages(), ["page"], { revalidate: 3600 })
