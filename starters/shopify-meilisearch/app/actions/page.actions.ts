"use server"

import { storefrontClient } from "clients/storefrontClient"
import { unstable_cacheTag as cacheTag, unstable_cacheLife as cacheLife } from "next/cache"

export const getPage = async (handle: string) => {
  "use cache"
  cacheTag(`page-${handle}`)
  cacheLife("days")

  return await storefrontClient.getPage(handle)
}

export const getAllPages = async () => {
  "use cache"
  cacheTag("all-pages")
  cacheLife("days")

  return await storefrontClient.getAllPages()
}
