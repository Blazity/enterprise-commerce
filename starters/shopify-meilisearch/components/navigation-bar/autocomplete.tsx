/* eslint-disable @next/next/no-img-element */
"use client"

import { type KeyboardEvent, useState } from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"

import { useClickAway } from "@uidotdev/usehooks"

import { cn } from "utils/cn"
import { getHighlightedText } from "utils/highlighted-text"
import { useAutocomplete } from "utils/use-autocomplete"

import { SearchIcon } from "components/icons/search-icon"
import { Spinner } from "components/spinner"

interface AutocompleteProps {
  className?: string
}

export function Autocomplete({ className }: AutocompleteProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const { query, results, isPending, onChange, status } = useAutocomplete({
    callback: () => !isOpen && setIsOpen(true),
  })
  const ref = useClickAway<HTMLDivElement>(() => {
    setIsOpen(false)
  })

  function handleOnInputFocus() {
    if (hasResults) setIsOpen(true)
  }

  function handleOnKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      router.push(`/search?q=${query}`)
      setIsOpen(false)
    }
  }

  const hasResults = !!results && results.length > 0

  return (
    <div className="relative hidden lg:block">
      <div className={cn("relative block w-[240px] overflow-hidden rounded-md", className)}>
        {!!isPending && <Spinner className="absolute inset-y-1.5 right-2" />}
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
          <SearchIcon className="size-4 text-neutral-500" />
        </div>
        <input
          type="search"
          className="block w-full rounded-md border border-neutral-300 bg-neutral-100 px-2.5 py-1.5 pl-10 text-sm text-black focus:border-blue-500 focus:ring-blue-500  "
          placeholder="Search..."
          onChange={onChange}
          onFocus={handleOnInputFocus}
          onKeyDown={handleOnKeyDown}
        />
      </div>

      <div className={cn("absolute top-10 z-50 w-[240px] rounded-b-md bg-white shadow-lg", { hidden: !isOpen })} ref={ref}>
        {hasResults &&
          results.map((singleProduct) => (
            <Link
              href={`/product/${singleProduct.handle}`}
              className="flex h-[70px] cursor-pointer items-center gap-4 border-b border-neutral-200 p-4 last:rounded-b-md last:border-0 hover:bg-neutral-50"
              key={singleProduct.id}
              onClick={() => setIsOpen(false)}
            >
              <p className="line-clamp-2 text-xs">{getHighlightedText(singleProduct.title, query)}</p>
            </Link>
          ))}
        {status === "error" && <p className="p-4 text-xs text-red-500">Sorry, something went wrong, please try again later</p>}
      </div>
    </div>
  )
}
