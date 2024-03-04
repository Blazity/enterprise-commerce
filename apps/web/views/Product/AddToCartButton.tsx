"use client"

import { PlatformVariant } from "@enterprise-commerce/core/platform/types"
import { addCartItem } from "app/actions"
import { Button } from "components/Button"
import { useTransition } from "react"
import { useModalStore } from "stores/modalStore"
import { cn } from "utils/cn"
import { Combination } from "utils/productOptionsUtils"

export function AddToCartButton({ className, combination }: { className?: string; combination: Combination | PlatformVariant | undefined }) {
  const [isPending, startTransition] = useTransition()
  const openModal = useModalStore((s) => s.openModal)

  const handleOnClick = async () => {
    startTransition(async () => {
      if (combination?.id) {
        await addCartItem(combination?.id)
        openModal("cart")
      }
    })
  }

  return (
    <Button
      onClick={handleOnClick}
      variant="secondary"
      size="xl"
      isAnimated={false}
      className={cn("relative w-fit rounded-xl transition-transform hover:scale-105 hover:text-white", className)}
      isLoading={isPending}
      disabled={isPending}
    >
      Add to Cart
    </Button>
  )
}
