"use server"

import { PlatformUserCreateInput } from "lib/shopify/types"
import { cookies } from "next/headers"
import { storefrontClient } from "clients/storefrontClient"
import { COOKIE_ACCESS_TOKEN } from "constants/index"

export async function signupUser({ email, password }: { email: string; password: string }) {
  const user = await storefrontClient.createUser({ email, password })
  return user
}

export async function loginUser({ email, password }: { email: string; password: string }) {
  const cookieStore = await cookies()
  const user = await storefrontClient.createUserAccessToken({ email, password })
  cookieStore.set(COOKIE_ACCESS_TOKEN, user?.accessToken || "", { expires: new Date(user?.expiresAt || "") })
  return user
}

export async function getCurrentUser() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get(COOKIE_ACCESS_TOKEN)?.value
  const user = await storefrontClient.getUser(accessToken || "")
  return user
}

export async function updateUser(input: Pick<PlatformUserCreateInput, "firstName" | "lastName" | "phone">) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get(COOKIE_ACCESS_TOKEN)?.value

  const user = await storefrontClient.updateUser(accessToken!, { ...input })
  return user
}

export async function logoutUser() {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_ACCESS_TOKEN)
}
