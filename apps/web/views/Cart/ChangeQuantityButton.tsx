import { updateItemQuantity } from "app/actions/cart.actions"
import { Spinner } from "components/Spinner/Spinner"
import { useEffect } from "react"
import { useFormState, useFormStatus } from "react-dom"
import { toast } from "sonner"

interface ChangeQuantityButtonProps {
  id: string
  variantId: string
  quantity: number
  children: React.ReactNode
}

export function ChangeQuantityButton({ id, variantId, quantity, children }: ChangeQuantityButtonProps) {
  const [state, formAction] = useFormState(updateItemQuantity, { ok: false })

  const actionWithParams = formAction.bind(null, { itemId: id, variantId, quantity })

  useEffect(() => {
    if (!state.ok && state.message) {
      toast(state.message)
    }
  }, [state])

  return (
    <form action={actionWithParams}>
      <Submit>{children}</Submit>
    </form>
  )
}

function Submit({ children }: Pick<ChangeQuantityButtonProps, "children">) {
  const { pending } = useFormStatus()

  return (
    <div className="relative flex h-full w-fit items-center">
      <button
        className="flex cursor-pointer items-center gap-2 bg-transparent transition-transform hover:scale-150"
        type="submit"
        onClick={(e) => pending && e.preventDefault()}
        disabled={pending}
      >
        {pending ? <Spinner className="size-2" /> : children}
      </button>
    </div>
  )
}
