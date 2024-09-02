"use client"

import { useModalStore } from "stores/modalStore"

import { ThinSearchIcon } from "components/Icons/ThinSearchIcon"
import { Button } from "components/Button/Button"

export function SearchButton() {
  const openModal = useModalStore((s) => s.openModal)

  return (
    <Button aria-label="Launch search modal" variant="ghost" className="ml-3 flex items-center justify-center p-1" onClick={() => openModal("search")}>
      <ThinSearchIcon className="size-6" />
    </Button>
  )
}
