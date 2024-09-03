"use server"

import { COOKIE_FAVORITES } from "constants/index"
import { cookies } from "next/headers"

export async function toggleFavoriteProduct(prevState: any, handle: string) {
  const handles = await getParsedFavoritesHandles()
  const isFavorite = handles.includes(handle)
  const newFavorites = handles.includes(handle) ? handles.filter((i) => i !== handle) : [...handles, handle]

  cookies().set(COOKIE_FAVORITES, JSON.stringify(newFavorites))

  return !isFavorite
}

export async function getParsedFavoritesHandles() {
  const favoritesCookie = cookies().get(COOKIE_FAVORITES)?.value || "[]"
  const favoritesHandles = JSON.parse(favoritesCookie) as string[]
  return favoritesHandles
}
