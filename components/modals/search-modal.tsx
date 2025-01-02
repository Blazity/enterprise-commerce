import { type KeyboardEvent } from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"

import { type Modal, useModalStore } from "stores/modal-store"

import { useAutocomplete } from "utils/use-autocomplete"
import { getHighlightedText } from "utils/highlighted-text"

import { Input } from "components/ui/input"
import { Button } from "components/ui/button-old"
import { Spinner } from "components/spinner"
import { Dialog, DialogClose, DialogContent, DialogHeader } from "components/ui/dialog"
import { ProductCard } from "components/product-card"

export function SearchModal() {
  const router = useRouter()
  const { query, results, onChange, hasMore, status } = useAutocomplete({ noOfResults: 10 })
  const modals = useModalStore((s) => s.modals)
  const closeModal = useModalStore((s) => s.closeModal)

  function handleButtonClick() {
    if (!query) return

    router.push(`/search?q=${query}`)
    closeModal("search")
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      router.push(`/search?q=${query}`)
      closeModal("search")
    }
  }

  return (
    <Dialog open={!!modals["search"]} onOpenChange={() => closeModal("search")}>
      <DialogContent className="size-full content-start overflow-auto bg-white p-0 sm:max-w-[425px]">
        <DialogHeader className="bg-neutral-100">
          <div className="flex w-full flex-row items-center justify-between gap-4 px-8">
            <Input
              className="text-md my-4 block w-full border-0 bg-transparent px-2.5 py-3.5 font-normal text-black"
              placeholder="Search"
              type="search"
              name="search"
              onChange={onChange}
              onKeyDown={onKeyDown}
              autoFocus
            />
            <DialogClose className="ring-offset-background focus:ring-ring bg-transparent transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none">
              <span className="font-bold tracking-tight text-neutral-800">Close</span>
              <span className="sr-only">Close</span>
            </DialogClose>
          </div>
        </DialogHeader>
        <div className="w-full p-8">
          <Results results={results} query={query} status={status} closeModal={closeModal} />
        </div>

        {status === "done" && hasMore && (
          <div className="relative bottom-0 flex size-full items-center justify-center bg-white p-4">
            <Button variant="secondary" className="w-3/4 items-center justify-center text-sm" onClick={handleButtonClick}>
              See more
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

interface ResultsProps {
  results: ReturnType<typeof useAutocomplete>["results"]
  query: ReturnType<typeof useAutocomplete>["query"]
  status: ReturnType<typeof useAutocomplete>["status"]
  closeModal: (modal: Modal) => void
}

function Results({ results, query, status, closeModal }: ResultsProps) {
  switch (status) {
    case "idle":
      return (
        <div className="flex flex-col gap-2">
          <p className="text-[18px] text-neutral-400">Popular search terms</p>
          <ul className="flex flex-col gap-1 text-[20px]">
            <li>Black Shoes</li>
            <li>Makeup</li>
            <li>Laptop</li>
            <li>Smartphone</li>
          </ul>
        </div>
      )
    case "loading":
      return (
        <div className="flex w-full items-center justify-center">
          <Spinner className="size-10 border-black border-b-white" />
        </div>
      )
    case "error":
      return <p className="text-center text-red-500">Sorry, something went wrong, please try again later</p>

    case "done": {
      const hasResults = !!results && results?.length > 0
      if (!hasResults) {
        return (
          <div className="flex w-full items-center justify-center">
            <p className="text-base text-neutral-500">No results found</p>
          </div>
        )
      }
      return (
        <>
          <div className="flex flex-col gap-2">
            <p className="text-[18px] text-neutral-400">Top suggestions</p>
            <ul className="mb-6 flex max-w-72 flex-col gap-1 text-[20px]">
              {results.slice(0, 5).map((singleResult) => (
                <Link key={singleResult.id} href={`/product/${singleResult.handle}`}>
                  <li onClick={() => closeModal("search")}>{getHighlightedText(singleResult.title, query)}</li>
                </Link>
              ))}
            </ul>
          </div>
          <div className="grid w-full grid-cols-[repeat(_auto-fill,minmax(115px,1fr)_)] items-start gap-4 gap-y-8 md:grid-cols-[repeat(_auto-fill,minmax(280px,1fr)_)]">
            {results?.map(({ id, ...rest }) => (
              <div key={id} onClick={() => closeModal("search")}>
                <ProductCard className="overflow-hidden rounded-lg" {...rest} />
              </div>
            ))}
          </div>
        </>
      )
    }

    default:
      return null
  }
}
