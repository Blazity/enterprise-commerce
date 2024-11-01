"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"

import type { PlatformVariant } from "lib/shopify/types"

import { addCartItem, getItemAvailability } from "app/actions/cart.actions"

import { Button } from "components/ui/button"
import { BagIcon } from "components/icons/bag-icon"

import { cn } from "utils/cn"
import { getCookie } from "utils/get-cookie"
import type { Combination } from "utils/product-options-utils"

import { useAddProductStore } from "stores/add-product-store"
import { useCartStore } from "stores/cart-store"

import type { CommerceProduct } from "types"

import { COOKIE_CART_ID } from "constants/index"

export function AddToCartButton({ className, product, combination }: { className?: string; product: CommerceProduct; combination: Combination | PlatformVariant | undefined }) {
  const [isPending, setIsPending] = useState(false)
  const [hasAnyAvailable, setHasAnyAvailable] = useState(true)
  const { setProduct, clean } = useAddProductStore()
  const { cart, refresh, setCheckoutReady } = useCartStore((s) => s)

  const disabled = !hasAnyAvailable || !combination?.availableForSale || isPending

  // Mimic delay and display optimistic UI due to shopify API being slow
  const handleClick = async () => {
    if (!combination?.id) return

    setIsPending(true)

    setTimeout(() => {
      setProduct({ product, combination })
      setIsPending(false)
    }, 300)

    setTimeout(() => clean(), 4500)

    setCheckoutReady(false)
    const res = await addCartItem(null, combination.id, product.id)

    if (!res.ok) toast.error("Out of stock")

    setCheckoutReady(true)
    refresh()
  }

  useEffect(() => {
    const checkStock = async () => {
      const cartId = getCookie(COOKIE_CART_ID)
      const itemAvailability = await getItemAvailability({
        cartId,
        productId: product.id,
        variantId: combination?.id,
      })

      itemAvailability && setHasAnyAvailable(itemAvailability.inCartQuantity < (combination?.quantityAvailable || 0))
    }

    checkStock()
  }, [combination?.id, isPending, combination?.quantityAvailable, cart?.items, product.id])

  return (
    <Button
      onClick={handleClick}
      disabled={isPending || disabled}
      variant="default"
      className={cn("mx-auto w-full rounded-md p-10 py-4 transition-all hover:scale-105 md:w-full md:rounded-md md:py-4", className)}
    >
      <BagIcon className="mr-2 size-5 text-white" />
      Add to Bag
    </Button>
  )
}
