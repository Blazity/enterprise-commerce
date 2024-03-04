"use client"

import { Button } from "components/Button"
import { useModalStore } from "stores/modalStore"
import { cn } from "utils/cn"
import { addCartItem, getCart } from "app/actions"
import { useEffect, useState, useTransition } from "react"
import { Combination } from "utils/productOptionsUtils"
import { usePathname } from "next/navigation"
import { PlatformVariant } from "@enterprise-commerce/core/platform/types"

export function AddToCartButton({ className, combination }: { className?: string; combination: Combination | PlatformVariant | undefined }) {
  const pathname = usePathname()
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
  }, [])

  const handleOnClick = async () => {
    startTransition(async () => {
      if (combination?.id) {
        await addCartItem(combination?.id)
        cartQuantity
        openModal("cart")
      }
    })
  }

  console.log({ cartQuantity, quantity: combination?.quantityAvailable })

  return (
    <Button
      onClick={handleOnClick}
      variant="secondary"
      size="xl"
      isAnimated={false}
      className={cn("relative w-fit rounded-xl transition-transform hover:scale-105 hover:text-white", className)}
      isLoading={isPending}
      disabled={isPending || !combination?.availableForSale || combination?.quantityAvailable !== cartQuantity}
    >
      Add to Cart
    </Button>
  )
}
