import { updateItemQuantity } from "app/actions"
import { Spinner } from "components/Spinner"
import { useFormState, useFormStatus } from "react-dom"

interface ChangeQuantityButtonProps {
  id: string
  variantId: string
  quantity: number
  children: React.ReactNode
}

export function ChangeQuantityButton({ id, variantId, quantity, children }: ChangeQuantityButtonProps) {
  const [state, formAction] = useFormState(updateItemQuantity, { ok: false })

  const actionWithParams = formAction.bind(null, { itemId: id, variantId, quantity })

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
