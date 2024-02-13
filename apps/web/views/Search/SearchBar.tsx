"use client"

import { Input } from "components/ui/Input"
import { useQueryState } from "nuqs"

export function SearchBar() {
  const [query, setQuery] = useQueryState("q", { shallow: false })

  return (
    <Input
      className="w-full appearance-none bg-white pl-8 shadow-none "
      placeholder="Search for products..."
      type="search"
      value={query || ""}
      onChange={(event) => {
        setQuery(event.target.value)
      }}
    />
  )
}
