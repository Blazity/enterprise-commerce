"use client"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "components/Sheets"
import { useModalStore } from "stores/modalStore"

export function CartSheet() {
  const modals = useModalStore((s) => s.modals)
  const closeModal = useModalStore((s) => s.closeModal)

  return (
    <Sheet open={modals["cart"]} onOpenChange={() => closeModal("cart")}>
      <SheetContent className="bg-white">
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
