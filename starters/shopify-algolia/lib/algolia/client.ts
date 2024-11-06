import {
  type BatchProps,
  algoliasearch,
  type BrowseProps,
  type DeleteObjectsOptions,
  type GetRecommendationsParams,
  type PartialUpdateObjectsOptions,
  type SearchMethodParams,
  type SearchResponse,
  type SearchSingleIndexProps,
} from "algoliasearch"

import { env } from "env.mjs"

import { FilterBuilder } from "./filter-builder"

const algoliaClient = (args: { applicationId: string; apiKey: string }) => {
  return algoliasearch(args.applicationId, args.apiKey)
}

export const algolia = (args: { applicationId: string; apiKey: string }) => {
  const client = algoliaClient(args)
  const recommendationClient = client.initRecommend()

  return {
    search: async <T extends Record<string, any>>(args: SearchSingleIndexProps) => search<T>(args, client),
    getAllResults: async <T extends Record<string, any>>(args: BrowseProps) => getAllResults<T>(client, args),
    update: async (args: PartialUpdateObjectsOptions) => updateObjects(args, client),
    batchUpdate: async (args: BatchProps) => batchUpdate(args, client),
    delete: async (args: DeleteObjectsOptions) => deleteObjects(args, client),
    create: async (args: PartialUpdateObjectsOptions) => createObjects(args, client),
    multiSearch: async <T extends Record<string, any>>(args: SearchMethodParams) => multiSearch<T>(args, client),
    getRecommendations: async (args: GetRecommendationsParams) => getRecommendations(recommendationClient, args),
    filterBuilder: () => new FilterBuilder(),
    mapIndexToSort,
  }
}

const search = async <T extends Record<string, any>>(args: SearchSingleIndexProps, client: ReturnType<typeof algoliaClient>) => {
  return client.searchSingleIndex<T>(args)
}

// agregator as temp fix for now
const getAllResults = async <T extends Record<string, any>>(client: ReturnType<typeof algoliaClient>, args: BrowseProps) => {
  const allHits: T[] = []
  let totalPages: number
  let currentPage = 0

  do {
    const { hits, nbPages } = await client.browse<T>({
      ...args,
      browseParams: {
        ...args.browseParams,
        hitsPerPage: 1000,
        page: currentPage,
      },
    })
    allHits.push(...hits)
    totalPages = nbPages || 0
    currentPage++
  } while (currentPage < totalPages)

  return { hits: allHits, totalPages }
}

const batchUpdate = async (args: BatchProps, client: ReturnType<typeof algoliaClient>) => {
  return client.batch(args)
}

const updateObjects = async (args: PartialUpdateObjectsOptions, client: ReturnType<typeof algoliaClient>) => {
  return client.partialUpdateObjects(args)
}

const deleteObjects = async (args: DeleteObjectsOptions, client: ReturnType<typeof algoliaClient>) => {
  return client.deleteObjects(args)
}

const createObjects = async (args: PartialUpdateObjectsOptions, client: ReturnType<typeof algoliaClient>) => {
  return client.partialUpdateObjects({
    ...args,
    createIfNotExists: true,
  })
}

const multiSearch = async <T extends Record<string, any>>(args: SearchMethodParams, client: ReturnType<typeof algoliaClient>) => {
  return client.search<T>(args) as Promise<{ results: SearchResponse<T>[] }>
}

const getRecommendations = async (client: ReturnType<ReturnType<typeof algoliaClient>["initRecommend"]>, args: GetRecommendationsParams) => {
  return client.getRecommendations(args)
}

export type SortType = "minPrice:desc" | "minPrice:asc" | "avgRating:desc" | "updatedAtTimestamp:asc" | "updatedAtTimestamp:desc"

const mapIndexToSort = (index: string, sortOption: SortType) => {
  switch (sortOption) {
    case "minPrice:desc":
      return `${index}_price_desc`
    case "minPrice:asc":
      return `${index}_price_asc`
    case "avgRating:desc":
      return `${index}_rating_desc`
    case "updatedAtTimestamp:asc":
      return `${index}_updated_asc`
    case "updatedAtTimestamp:desc":
      return `${index}_updated_desc`

    default:
      return index
  }
}

export const searchClient: ReturnType<typeof algolia> = algolia({
  applicationId: env.ALGOLIA_APP_ID || "",
  // Make sure write api key never leaks to the client
  apiKey: env.ALGOLIA_WRITE_API_KEY || "",
})
