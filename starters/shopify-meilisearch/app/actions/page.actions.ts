"use server"

import { storefrontClient } from "clients/storefrontClient"
import { unstable_cache } from "next/cache"

export const getPage = unstable_cache(async (handle: string) => await storefrontClient.getPage(handle), ["page"], { revalidate: 3600 })

export const getAllPages = unstable_cache(async () => await storefrontClient.getAllPages(), ["page"], { revalidate: 3600 })
