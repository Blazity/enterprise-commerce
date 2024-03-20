/* eslint-disable @next/next/no-img-element */
"use client"

import { PlatformProduct } from "@enterprise-commerce/core/platform/types"
import { useClickAway, useDebounce } from "@uidotdev/usehooks"
import { searchProducts } from "app/actions/product.actions"
import { SearchIcon } from "components/Icons/SearchIcon"
import { Spinner } from "components/Spinner"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChangeEvent, KeyboardEvent, useEffect, useState, useTransition } from "react"
import { cn } from "utils/cn"
import { getHighlightedText } from "utils/highlightedText"

interface AutocompleteProps {
  className?: string
}

export function Autocomplete({ className }: AutocompleteProps) {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [results, setResults] = useState<PlatformProduct[] | null>(null)
  const router = useRouter()

  const debouncedQuery = useDebounce(query, 300)

  const ref = useClickAway<HTMLDivElement>(() => {
    setIsOpen(false)
  })

  useEffect(() => {
    if (debouncedQuery) {
      startTransition(async () => {
        const searchResults = await searchProducts(debouncedQuery)
        setIsOpen(true)
        setResults(searchResults)
      })
    }
  }, [debouncedQuery])

  async function handleOnInputChange(e: ChangeEvent<HTMLInputElement>) {
    const query = e.target.value
    setQuery(query)

    if (query.trim() === "") {
      setResults(null)
      return
    }
  }

  function handleOnInputFocus() {
    if (hasResults) setIsOpen(true)
  }

  function handleOnKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      router.push(`/search?q=${query}`)
      setIsOpen(false)
    }
  }

  const hasResults = results && results.length > 0

  const resultsMarkup =
    !!hasResults &&
    results.map((singleProduct) => (
      <Link
        href={`/products/${singleProduct.handle}`}
        className="flex h-[70px] cursor-pointer items-center gap-4 border-b border-neutral-200 p-4 last:rounded-b-md last:border-0 hover:bg-neutral-50"
        key={singleProduct.id}
        onClick={() => setIsOpen(false)}
      >
        <p className="line-clamp-2 text-[12px]">{getHighlightedText(singleProduct.title, debouncedQuery)}</p>
      </Link>
    ))

  return (
    <div className="relative hidden lg:block">
      <div className={cn("relative block w-[240px] overflow-hidden rounded-[66px]", className)}>
        {!!isPending && <Spinner className="absolute inset-y-1.5 right-2" />}
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
          <SearchIcon className="size-4 text-neutral-500" />
        </div>
        <input
          type="search"
          className="block w-full rounded-[66px] border border-neutral-300 bg-neutral-100 px-2.5 py-1.5 pl-10 text-[12px] text-black focus:border-blue-500 focus:ring-blue-500  "
          placeholder="Search..."
          onChange={handleOnInputChange}
          onFocus={handleOnInputFocus}
          onKeyDown={handleOnKeyDown}
        />
      </div>

      <div className={cn("absolute top-10 z-50 w-[240px] rounded-b-md bg-white shadow-lg", { hidden: !isOpen })} ref={ref}>
        {resultsMarkup}
      </div>
    </div>
  )
}
