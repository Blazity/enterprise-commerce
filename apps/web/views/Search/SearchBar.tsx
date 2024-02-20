"use client"

import { Input } from "components/Input"
import { parseAsInteger, useQueryState } from "nuqs"

export function SearchBar() {
  const [query, setQuery] = useQueryState("q", { shallow: false })
  const [_, setPage] = useQueryState("page", { ...parseAsInteger, defaultValue: 1, shallow: false, history: "push", clearOnDefault: true })

  return (
    <Input
      className="w-full appearance-none bg-white pl-8 shadow-none "
      placeholder="Search for products..."
      type="search"
      value={query || ""}
      onChange={(event) => {
        setQuery(event.target.value)
        setPage(1)
      }}
    />
  )
}
