import {
  algoliasearch,
  type DeleteObjectsOptions,
  type PartialUpdateObjectsOptions,
  type SearchMethodParams,
  type SearchResponse,
  type SearchSingleIndexProps,
} from "algoliasearch"
import { FilterBuilder } from "./filterBuilder"

const algoliaClient = (args: { applicationId: string; apiKey: string }) => {
  return algoliasearch(args.applicationId, args.apiKey)
}

export const algolia = (args: { applicationId: string; apiKey: string }) => {
  const client = algoliaClient(args)

  return {
    search: <T extends Record<string, any>>(args: SearchSingleIndexProps) => search<T>(args, client),
    update: (args: PartialUpdateObjectsOptions) => updateObjects(args, client),
    delete: (args: DeleteObjectsOptions) => deleteObjects(args, client),
    create: (args: PartialUpdateObjectsOptions) => createObjects(args, client),
    multiSearch: <T extends Record<string, any>>(args: SearchMethodParams) => multiSearch<T>(args, client),
    filterBuilder: () => new FilterBuilder(),
  }
}

const search = <T extends Record<string, any>>(args: SearchSingleIndexProps, client: ReturnType<typeof algoliaClient>) => {
  return client.searchSingleIndex<T>(args)
}

const updateObjects = (args: PartialUpdateObjectsOptions, client: ReturnType<typeof algoliaClient>) => {
  return client.partialUpdateObjects(args)
}

const deleteObjects = (args: DeleteObjectsOptions, client: ReturnType<typeof algoliaClient>) => {
  return client.deleteObjects(args)
}

const createObjects = (args: PartialUpdateObjectsOptions, client: ReturnType<typeof algoliaClient>) => {
  return client.partialUpdateObjects({
    ...args,
    createIfNotExists: true,
  })
}

const multiSearch = <T extends Record<string, any>>(args: SearchMethodParams, client: ReturnType<typeof algoliaClient>) => {
  return client.search<T>(args) as Promise<{ results: SearchResponse<T>[] }>
}
