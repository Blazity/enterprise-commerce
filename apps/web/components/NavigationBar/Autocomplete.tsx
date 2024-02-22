/* eslint-disable @next/next/no-img-element */
"use client"

import { searchProducts } from "app/actions"
import { useClickAway, useDebounce } from "@uidotdev/usehooks"
import { useRouter } from "next/navigation"
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react"
import { cn } from "utils/cn"
import { PlatformProduct } from "@enterprise-commerce/core/platform/types"
import Link from "next/link"

interface AutocompleteProps {
  className?: string
}

export function Autocomplete({ className }: AutocompleteProps) {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [results, setResults] = useState<PlatformProduct[] | null>(null)
  const router = useRouter()

  const debouncedQuery = useDebounce(query, 250)

  const ref = useClickAway<HTMLDivElement>(() => {
    setIsOpen(false)
  })

  useEffect(() => {
    async function handler() {
      if (debouncedQuery) {
        const searchResults = await searchProducts(query)
        setIsOpen(true)
        setResults(searchResults)
      }
    }

    handler()
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
        className="flex h-[70px] cursor-pointer items-center gap-4 border-b border-black p-4 last:rounded-b-md last:border-0 hover:bg-gray-50"
        key={singleProduct.id}
        onClick={() => setIsOpen(false)}
      >
        <p className="line-clamp-2 text-[12px]">{getHighlightedText(singleProduct.title, debouncedQuery)}</p>
      </Link>
    ))

  return (
    <div className="relative hidden lg:block">
      <div className={cn("relative block w-[240px] overflow-hidden rounded-[66px]", className)}>
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
          <svg aria-hidden="true" className="size-4 text-gray-400 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
          </svg>
        </div>
        <input
          type="text"
          className="block w-full rounded-[66px] border border-gray-300 bg-gray-100 px-2.5 py-1.5 pl-10 text-[12px] text-black focus:border-blue-500 focus:ring-blue-500  "
          placeholder="Search..."
          onChange={handleOnInputChange}
          onFocus={handleOnInputFocus}
          onKeyDown={handleOnKeyDown}
        />
      </div>

      <div className={cn("absolute top-14 z-50 w-[240px] rounded-b-md border border-t-0 border-black bg-white", { hidden: !isOpen })} ref={ref}>
        {resultsMarkup}
      </div>
    </div>
  )
}

function getHighlightedText(text, highlight) {
  const parts = text.split(new RegExp(`(${highlight})`, "gi"))
  return (
    <span>
      {parts.map((part, i) => (
        <span key={i} className={cn({ "font-bold": part.toLowerCase() === highlight.toLowerCase() })}>
          {part}
        </span>
      ))}{" "}
    </span>
  )
}
