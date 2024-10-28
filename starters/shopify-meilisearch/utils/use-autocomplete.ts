import { type ChangeEvent, useEffect, useState, useTransition } from "react"

import { useDebounce } from "@uidotdev/usehooks"

import type { CommerceProduct } from "types"
import { searchProducts } from "app/actions/product.actions"

/*
 * Callback is optional to be called every time the query changes
 */

type AutocompleteArgs = {
  callback?: (e: ChangeEvent<HTMLInputElement>) => void
  debounce?: number
  noOfResults?: number
}
export function useAutocomplete({ callback, debounce = 300, noOfResults = 4 }: AutocompleteArgs = {}) {
  const [query, setQuery] = useState("")
  const [hasMore, setHasMore] = useState(false)
  const [status, setStatus] = useState<"idle" | "error" | "loading" | "done">("idle")
  const [results, setResults] = useState<CommerceProduct[] | null>(null)

  const [isPending, startTransition] = useTransition()
  const debouncedQuery = useDebounce(query, debounce)

  useEffect(() => {
    if (debouncedQuery) {
      startTransition(async () => {
        try {
          setStatus("loading")
          const { hits, hasMore } = await searchProducts(debouncedQuery, noOfResults)
          setResults(hits)
          setHasMore(hasMore)
          setStatus("done")
        } catch (error) {
          setResults(null)
          setStatus("error")
        }
      })
    }
  }, [debouncedQuery, noOfResults])

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setQuery(query)

    if (query.trim() === "") {
      setResults(null)
      setHasMore(false)
      setStatus("idle")

      return
    }

    callback && callback(e)
  }

  return { results, isPending, onChange, status, query, hasMore }
}
