"use client"

import { PlatformVariant } from "@enterprise-commerce/core/platform/types"
import { addCartItem, getItemAvailability } from "app/actions"
import { Button } from "components/Button"
import { useEffect, useState, useTransition } from "react"
import { useFormState, useFormStatus } from "react-dom"
import { cn } from "utils/cn"
import { getCookie } from "utils/getCookie"
import { Combination } from "utils/productOptionsUtils"

export function AddToCartButton({ className, combination }: { className?: string; combination: Combination | PlatformVariant | undefined }) {
  const [isPending, startTransition] = useTransition()
  const [state, formAction] = useFormState(addCartItem, { ok: false })
  const [hasAnyAvailable, setHasAnyAvailable] = useState(false)

  const actionWithParams = formAction.bind(null, combination?.id)

  useEffect(() => {
    startTransition(async () => {
      const cartId = getCookie("ecom_cartId")
      const itemAvailability = await getItemAvailability(cartId, combination?.id)

      itemAvailability && setHasAnyAvailable(itemAvailability.inCartQuantity < itemAvailability.inStockQuantity)
    })
  }, [combination?.id, state])

  console.log(combination)

  return (
    <form className={className} action={actionWithParams}>
      <Submit disabled={!hasAnyAvailable || isPending}>{combination?.availableForSale ? "Add to Cart" : "Out Of Stock"}</Submit>
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
