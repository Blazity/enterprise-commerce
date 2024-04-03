import { type KeyboardEvent } from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"

import { type Modal, useModalStore } from "stores/modalStore"

import { useAutocomplete } from "utils/useAutocomplete"
import { getHighlightedText } from "utils/highlightedText"

import { Input } from "components/Input/Input"
import { Button } from "components/Button/Button"
import { Spinner } from "components/Spinner/Spinner"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "components/Dialog/Dialog"

export function SearchModal() {
  const router = useRouter()
  const { query, results, onChange, hasMore, status } = useAutocomplete({
    noOfResults: 10,
  })
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
      <DialogContent className="max-h-[90%] min-h-[90%] max-w-[90%] content-start overflow-auto bg-white pb-0 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            <Input className="my-4" placeholder="Search" type="search" name="search" onChange={onChange} onKeyDown={onKeyDown} />
          </DialogTitle>
        </DialogHeader>
        <Results results={results} query={query} status={status} closeModal={closeModal} />
        {status === "done" && hasMore && (
          <div className="sticky bottom-0 flex size-full items-center justify-center bg-white p-4">
            <Button variant="secondary" className="w-3/4 items-center justify-center text-sm" onClick={handleButtonClick}>
              See more
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

type ResultsProps = {
  results: ReturnType<typeof useAutocomplete>["results"]
  query: ReturnType<typeof useAutocomplete>["query"]
  status: ReturnType<typeof useAutocomplete>["status"]
  closeModal: (modal: Modal) => void
}
function Results({ results, query, status, closeModal }: ResultsProps) {
  switch (status) {
    case "idle":
      return null
    // turbo hard to see loading state, meilisearch responds really fast -- worth removing?
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
        <ul className="space-y-2">
          {results?.map(({ id, title, handle }) => (
            <li className="border-b border-neutral-200 p-4 last:border-0" key={id}>
              <Link href={`/products/${handle}`} onClick={() => closeModal("search")}>
                <p className="m-1 line-clamp-2 p-2 text-base">{getHighlightedText(title, query)}</p>
              </Link>
            </li>
          ))}
        </ul>
      )
    }

    default:
      return null
  }
}
