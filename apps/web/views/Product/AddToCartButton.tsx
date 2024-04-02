"use client"

import { PlatformVariant } from "@enterprise-commerce/core/platform/types"
import { addCartItem } from "app/actions/cart.actions"
import { Button } from "components/Button/Button"
import { useEffect } from "react"
import { useFormState, useFormStatus } from "react-dom"
import { useCartStore } from "stores/cartStore"
import { cn } from "utils/cn"
import { Combination } from "utils/productOptionsUtils"

export function AddToCartButton({ className, combination }: { className?: string; combination: Combination | PlatformVariant | undefined }) {
  const [state, formAction] = useFormState(addCartItem, { ok: false })
  const openCart = useCartStore((s) => s.openCart)

  const actionWithParams = formAction.bind(null, combination?.id)

  useEffect(() => {
    state.ok && openCart()
  }, [openCart, state])

  return (
    <form className={className} action={actionWithParams}>
      <Submit>{combination?.availableForSale ? "Add to Cart" : "Out Of Stock"}</Submit>
    </form>
  )
}

function Submit({ children }) {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      onClick={(e) => pending && e.preventDefault()}
      variant="secondary"
      size="xl"
      isAnimated={false}
      className={cn("relative w-fit rounded-xl transition-transform hover:scale-105 hover:text-white")}
      isLoading={pending}
      disabled={pending}
    >
      {children}
    </Button>
  )
}
