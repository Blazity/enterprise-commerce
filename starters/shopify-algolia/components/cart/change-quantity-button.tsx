import { useTransition } from "react"
import { toast } from "sonner"

import { updateItemQuantity } from "app/actions/cart.actions"
import { Spinner } from "components/spinner"
import { useCartStore } from "stores/cart-store"

interface ChangeQuantityButtonProps {
  id: string
  variantId: string
  quantity: number
  productId: string
  children: React.ReactNode
}

export function ChangeQuantityButton({ id, variantId, quantity, productId, children }: ChangeQuantityButtonProps) {
  const refresh = useCartStore((prev) => prev.refresh)
  const [isPending, startTransition] = useTransition()

  const handleClick = () => {
    startTransition(async () => {
      const { ok, message } = await updateItemQuantity(null, { itemId: id, variantId, quantity, productId })

      if (!ok && message) {
        toast.warning(message)
      }

      refresh()
    })
  }

  return (
    <div className="relative flex h-full w-fit items-center">
      <button
        className="flex cursor-pointer items-center gap-2 bg-transparent transition-transform hover:scale-150"
        onClick={handleClick}
        disabled={isPending}
      >
        {isPending ? <Spinner className="size-2" /> : children}
      </button>
    </div>
  )
}
