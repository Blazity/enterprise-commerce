import { updateItemQuantity } from "app/actions/cart.actions"
import { Spinner } from "components/Spinner/Spinner"
import { useTransition } from "react"
import { toast } from "sonner"
import { useCartStore } from "stores/cartStore"

interface ChangeQuantityButtonProps {
  id: string
  variantId: string
  quantity: number
  children: React.ReactNode
}

export function ChangeQuantityButton({ id, variantId, quantity, children }: ChangeQuantityButtonProps) {
  const refresh = useCartStore((prev) => prev.refresh)
  const [isPending, startTransition] = useTransition()

  const handleClick = () => {
    startTransition(async () => {
      const { ok, message } = await updateItemQuantity(null, { itemId: id, variantId, quantity })

      if (!ok && message) {
        toast.warning(message)
      }

      refresh()
    })
  }

  return (
    <div className="relative flex h-full w-fit items-center">
      <button className="flex cursor-pointer items-center gap-2 bg-transparent transition-transform hover:scale-150" onClick={handleClick} disabled={isPending}>
        {isPending ? <Spinner className="size-2" /> : children}
      </button>
    </div>
  )
}
