import { removeCartItem } from "app/actions/cart.actions"
import { LoadingDots } from "components/LoadingDots/LoadingDots"
import { useTransition } from "react"
import { useCartStore } from "stores/cartStore"
import { cn } from "utils/cn"

interface DeleteButtonProps {
  id: string
}

export function DeleteButton({ id }: DeleteButtonProps) {
  const refresh = useCartStore((prev) => prev.refresh)
  const [isPending, startTransition] = useTransition()

  const handleClick = () => {
    startTransition(async () => {
      const { ok } = await removeCartItem(null, id)

      if (ok) {
        refresh()
      }
    })
  }

  return (
    <div className={cn("flex w-fit gap-2", { "pointer-events-none": isPending })}>
      <button className="bg-transparent text-[13px] text-neutral-500 underline hover:no-underline" onClick={handleClick} disabled={isPending}>
        Delete
      </button>
      {isPending && <LoadingDots />}
    </div>
  )
}
