"use client"

import { Button } from "components/Button"
import { useModalStore } from "stores/modalStore"
import { cn } from "utils/cn"

export function AddToCartButton({ className }: { className?: string }) {
  const openModal = useModalStore((s) => s.openModal)

  return (
    <Button
      onClick={() => openModal("cart")}
      variant="secondary"
      size="xl"
      isAnimated={false}
      className={cn("w-fit rounded-xl transition-transform hover:scale-105 hover:text-white", className)}
    >
      Add to Cart
    </Button>
  )
}
