import type { PlatformVariant } from "@enterprise-commerce/core/platform/types"
import { addCartItem, getItemAvailability } from "app/actions/cart.actions"
import { Button } from "components/Button/Button"
import { useEffect, useState } from "react"
import { cn } from "utils/cn"
import { getCookie } from "utils/getCookie"
import type { Combination } from "utils/productOptionsUtils"
import { COOKIE_CART_ID } from "constants/index"
import { useAddProductStore } from "stores/addProductStore"
import { toast } from "sonner"
import { useCartStore } from "stores/cartStore"
import type { CommerceProduct } from "types"

export function AddToCartButton({
  className,
  product,
  combination,
}: {
  className?: string
  product: CommerceProduct
  combination: Combination | PlatformVariant | undefined
  slug: string
}) {
  const [isPending, setIsPending] = useState(false)
  const [hasAnyAvailable, setHasAnyAvailable] = useState(true)
  const { setProduct, clean } = useAddProductStore()
  const { cart, refresh } = useCartStore((s) => s)

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

    const res = await addCartItem(null, combination.id)

    if (!res.ok) toast.error("Out of stock")

    refresh()
  }

  useEffect(() => {
    const checkStock = async () => {
      const cartId = getCookie(COOKIE_CART_ID)
      const itemAvailability = await getItemAvailability(cartId, combination?.id)

      itemAvailability && setHasAnyAvailable(itemAvailability.inCartQuantity < (combination?.quantityAvailable || 0))
    }

    checkStock()
  }, [combination?.id, isPending, combination?.quantityAvailable, cart?.items])

  return (
    <Button
      onClick={handleClick}
      variant="secondary"
      size="xl"
      isAnimated={false}
      className={cn("relative w-fit rounded-xl transition-transform hover:scale-105 hover:text-white", className)}
      isLoading={isPending}
      disabled={isPending || disabled}
    >
      Add to Cart
    </Button>
  )
}
