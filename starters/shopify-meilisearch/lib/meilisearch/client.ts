import { env } from "env.mjs"
import { type DocumentOptions, type DocumentsDeletionQuery, type DocumentsIds, type DocumentsQuery, MeiliSearch, type MultiSearchParams, type SearchParams } from "meilisearch"

type MeilisearchArgsType = {
  host: string
  adminApiKey: string
}

const meilisearchClient = ({ host, adminApiKey }: Pick<MeilisearchArgsType, "host" | "adminApiKey">) => {
  return new MeiliSearch({
    host,
    apiKey: adminApiKey,
  })
}

const meilisearch = ({ host, adminApiKey }: MeilisearchArgsType) => {
  const client = meilisearchClient({
    host,
    adminApiKey,
  })

  return {
    searchDocuments: <Document extends Record<string, any>, S extends SearchParams = SearchParams>(args: SearchDocumentsArgs<S>) => searchDocuments<Document, S>(args, client),
    updateDocuments: <Document extends Record<string, any>>(args: UpdateDocumentsArgs<Document>) => updateDocuments(args, client),
    deleteDocuments: <Document extends Record<string, any>>(args: DeleteDocumentsArgs) => deleteDocuments<Document>(args, client),
    createDocuments: <Document extends Record<string, any>>(args: CreateDocumentsArgs<Document>) => createDocuments(args, client),
    getDocuments: <Document extends Record<string, any>>(args: GetDocumentsArgs<Document>) => getDocuments<Document>(args, client),
    multiSearch: <T extends Record<string, any>>(args: MultiSearchParams) => multiSearch<T>(args, client),
  }
}

type SearchDocumentsArgs<S extends SearchParams = SearchParams> = {
  indexName: string
  query?: string
  options: S
}

const searchDocuments = async <Document extends Record<string, unknown>, S extends SearchParams>(args: SearchDocumentsArgs<S>, client: MeiliSearch) => {
  const { indexName, query, options } = args

  const results = await client.index<Document>(indexName).search<Document, S>(query, options)

  return results
}

type UpdateDocumentsArgs<Document extends Record<string, unknown>> = {
  documents: Partial<Document>[]
  indexName: string
  options?: DocumentOptions
}

const updateDocuments = async <Document extends Record<string, unknown>>(args: UpdateDocumentsArgs<Document>, client: MeiliSearch) => {
  const { documents, indexName, options } = args

  const result = await client.index<Document>(indexName).updateDocuments(documents, options)

  return result
}

type DeleteDocumentsArgs = {
  indexName: string
  params: DocumentsDeletionQuery | DocumentsIds
}

const deleteDocuments = async <Document extends Record<string, unknown>>(args: DeleteDocumentsArgs, client: MeiliSearch) => {
  const { params, indexName } = args

  const result = await client.index<Document>(indexName).deleteDocuments(params)

  return result
}

type CreateDocumentsArgs<Document extends Record<string, unknown>> = {
  documents: Document[]
  indexName: string
  options?: DocumentOptions
}

const createDocuments = async <Document extends Record<string, unknown>>(args: CreateDocumentsArgs<Document>, client: MeiliSearch) => {
  const { documents, indexName, options } = args

  const result = await client.index<Document>(indexName).addDocuments(documents, options)

  return result
}

type GetDocumentsArgs<Document extends Record<string, any>> = {
  indexName: string
  options?: DocumentsQuery<Document>
}

const getDocuments = async <Document extends Record<string, unknown>>(args: GetDocumentsArgs<Document>, client: MeiliSearch) => {
  const { indexName, options } = args

  const result = await client.index<Document>(indexName).getDocuments<Document>(options)

  return result
}

const multiSearch = async <T extends Record<string, any>>(args: MultiSearchParams, client: MeiliSearch) => {
  const { queries } = args
  const { results } = await client.multiSearch<T>({
    queries,
  })

  return results
}

export const searchClient = meilisearch({
  host: env.MEILISEARCH_HOST || "",
  adminApiKey: env.MEILISEARCH_ADMIN_KEY || "",
})
