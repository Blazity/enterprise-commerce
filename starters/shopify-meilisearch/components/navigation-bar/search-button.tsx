"use client"

import { useModalStore } from "stores/modal-store"

import { ThinSearchIcon } from "components/icons/thin-search-icon"
import { Button } from "components/ui/button-old"

export function SearchButton() {
  const { openModal } = useModalStore()

  return (
    <Button aria-label="Launch search modal" variant="ghost" className="ml-3 flex items-center justify-center p-1" onClick={() => openModal("search")}>
      <ThinSearchIcon className="size-6" />
    </Button>
  )
}
