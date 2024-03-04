"use client"

import { PlatformVariant } from "@enterprise-commerce/core/platform/types"
import { addCartItem, getCart } from "app/actions"
import { Button } from "components/Button"
import { useEffect, useState, useTransition } from "react"
import { useModalStore } from "stores/modalStore"
import { cn } from "utils/cn"
import { Combination } from "utils/productOptionsUtils"

export function AddToCartButton({ className, combination }: { className?: string; combination: Combination | PlatformVariant | undefined }) {
  const [cartQuantity, setCartQuantity] = useState<number | null>(null)
  const [isPending, startTransition] = useTransition()
  const openModal = useModalStore((s) => s.openModal)

  useEffect(() => {
    startTransition(async () => {
      const cart = await getCart()
      if (cart && combination) {
        setCartQuantity(cart.items.find((item) => item.merchandise.id === combination.id)?.quantity || null)
      }
    })
  }, [combination])

  const handleOnClick = async () => {
    startTransition(async () => {
      if (combination?.id) {
        await addCartItem(combination?.id)
        // cartQuantity
        openModal("cart")
      }
    })
  }

  const isQuantityAvailable = (combination?.quantityAvailable ?? Infinity) >= (cartQuantity ?? 0)

  return (
    <Button
      onClick={handleOnClick}
      variant="secondary"
      size="xl"
      isAnimated={false}
      className={cn("relative w-fit rounded-xl transition-transform hover:scale-105 hover:text-white", className)}
      isLoading={isPending}
      disabled={isPending || !combination?.availableForSale || !isQuantityAvailable}
    >
      Add to Cart
    </Button>
  )
}
