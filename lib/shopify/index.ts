import { unstable_cache } from "next/cache"
import { storefrontClient } from "./client"
import type { PlatformItemInput } from "./types"
import { TAGS } from "constants/index"

export const getPage = unstable_cache(async (handle: string) => await storefrontClient.getPage(handle), ["page"], { revalidate: 86400 })

export const getProduct = unstable_cache(async (id: string) => await storefrontClient.getProduct(id), ["product"], { revalidate: 86400 })

export const getProductByHandle = unstable_cache(async (handle: string) => await storefrontClient.getProductByHandle(handle), ["product"], { revalidate: 86400 })

export const getAdminProduct = async (id: string) => await storefrontClient.getAdminProduct(id)

export const getAllPages = unstable_cache(async () => await storefrontClient.getAllPages(), ["page"], { revalidate: 86400 })

export const getCart = unstable_cache(async (cartId: string) => await storefrontClient.getCart(cartId), [TAGS.CART], {
  revalidate: 900,
  tags: [TAGS.CART],
})

export const getCollection = unstable_cache(async (id: string) => await storefrontClient.getCollectionById(id), ["collection"], { revalidate: 86400 })

export const getHierarchicalCollections = unstable_cache(async (handle: string) => await storefrontClient.getHierarchicalCollections(handle), ["collection"], { revalidate: 86400 })

export const createCart = async () => await storefrontClient.createCart([])

export const createCartItem = async (cartId: string, items: PlatformItemInput[]) => await storefrontClient.createCartItem(cartId, items)

export const deleteCartItem = async (cartId: string, itemIds: string[]) => await storefrontClient.deleteCartItem(cartId, itemIds)

export const updateCartItem = async (cartId: string, items: PlatformItemInput[]) => await storefrontClient.updateCartItem(cartId, items)
