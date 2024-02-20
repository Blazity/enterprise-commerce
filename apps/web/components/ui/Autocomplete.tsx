"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Autocomplete({ searchProducts }: any) {
  const [results, setResults] = useState<any>(null)
  const [query, setQuery] = useState("")
  const router = useRouter()

  return (
    <div className="relative flex flex-col">
      <input
        type="text"
        className="bg-red-400"
        placeholder="Search your products..."
        onChange={async (e) => {
          const query = e.target.value
          setQuery(query)
          setResults(await searchProducts(query))
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            router.push(`/search?q=${query}`)
          }
        }}
      />

      {results?.hits ? (
        <div id="dropdownNavbar" className="absolute top-10 z-50 w-[300px] divide-y divide-gray-100 rounded-lg bg-white font-normal shadow">
          <ul className="py-2 text-sm text-gray-700">
            {results?.hits?.map((singleResult) => (
              <li key={singleResult.id}>
                <Link href={`/products/${singleResult.handle}`} className="block px-4 py-2 hover:bg-gray-100">
                  {singleResult?.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
}
