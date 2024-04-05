import { removeCartItem } from "app/actions/cart.actions"
import { LoadingDots } from "components/LoadingDots/LoadingDots"
import { useEffect } from "react"
import { useFormState, useFormStatus } from "react-dom"
import { useCartStore } from "stores/cartStore"
import { cn } from "utils/cn"

interface DeleteButtonProps {
  id: string
}

export function DeleteButton({ id }: DeleteButtonProps) {
  const [state, formAction] = useFormState(removeCartItem, { ok: false })
  const refresh = useCartStore((prev) => prev.refresh)

  const actionWithParams = formAction.bind(null, id)

  useEffect(() => {
    state.ok && refresh()
  }, [state.ok, refresh])

  return (
    <form action={actionWithParams}>
      <Submit />
    </form>
  )
}

function Submit() {
  const { pending } = useFormStatus()

  return (
    <div className={cn("flex w-fit gap-2", { "pointer-events-none": pending })}>
      <button className="bg-transparent text-[13px] text-neutral-500 underline hover:no-underline" type="submit" onClick={(e) => pending && e.preventDefault()} disabled={pending}>
        Delete
      </button>
      {pending && <LoadingDots />}
    </div>
  )
}
