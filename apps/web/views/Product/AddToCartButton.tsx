"use client"

import { PlatformVariant } from "@enterprise-commerce/core/platform/types"
import { addCartItem, getItemAvailability } from "app/actions/cart.actions"
import { Button } from "components/Button/Button"
import { useEffect, useState, useTransition } from "react"
import { useFormState, useFormStatus } from "react-dom"
import { useCartStore } from "stores/cartStore"
import { cn } from "utils/cn"
import { getCookie } from "utils/getCookie"
import { Combination } from "utils/productOptionsUtils"
import { COOKIE_CART_ID } from "constants/index"

export function AddToCartButton({ className, combination }: { className?: string; combination: Combination | PlatformVariant | undefined }) {
  const [isPending, startTransition] = useTransition()
  const [state, formAction] = useFormState(addCartItem, { ok: false })
  const [hasAnyAvailable, setHasAnyAvailable] = useState(false)
  const openCart = useCartStore((s) => s.openCart)

  const actionWithParams = formAction.bind(null, combination?.id)

  useEffect(() => {
    state.ok && openCart()
  }, [openCart, state])

  useEffect(() => {
    startTransition(async () => {
      const cartId = getCookie(COOKIE_CART_ID)
      const itemAvailability = await getItemAvailability(cartId, combination?.id)

      itemAvailability && setHasAnyAvailable(itemAvailability.inCartQuantity < itemAvailability.inStockQuantity)
    })
  }, [combination?.id, state])

  return (
    <form className={className} action={actionWithParams}>
      <Submit disabled={!hasAnyAvailable || isPending}>{"Add to Cart"}</Submit>
    </form>
  )
}

function Submit({ children, disabled }) {
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
      disabled={pending || disabled}
    >
      {children}
    </Button>
  )
}
