import { loginUser } from "app/actions"
import { Button } from "components/Button"
import { DialogFooter } from "components/Dialog"
import { GenericModal } from "components/GenericModal"
import { Input } from "components/Input"
import { Label } from "components/Label"
import { Logo } from "components/Logo"
import { useRouter } from "next/navigation"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { useModalStore } from "stores/modalStore"

interface LoginInputs {
  email: string
  password: string
}

export function LoginModal() {
  const modals = useModalStore((s) => s.modals)
  const closeModal = useModalStore((s) => s.closeModal)
  const router = useRouter()
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors, isSubmitting, isLoading },
  } = useForm<LoginInputs>()

  async function onSubmit(payload: LoginInputs) {
    const { email, password } = payload
    const user = await loginUser({ email, password })

    if (user) {
      router.push("/settings")
      toast.success("Successfully logged in")

      closeModal("login")
      return
    }

    setError("root", { message: "Couldn't log in. The email address or password is incorrect." })
  }

  return (
    <GenericModal title="Login" open={!!modals["login"]} onOpenChange={() => closeModal("login")}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Logo className="mt-6 flex size-24 w-full justify-center" />
        <div className="flex w-full flex-col items-center gap-6 px-0 py-4 md:px-2 md:pt-8">
          {errors.root?.message && <p className="w-full text-[14px] leading-tight tracking-tight text-red-400">{errors.root?.message}</p>}
          <div className="flex w-full flex-col justify-center gap-4">
            <Label htmlFor="email" className="text-md">
              Email
            </Label>
            <Controller name="email" control={control} rules={{ required: true }} render={({ field }) => <Input type="email" {...field} />} />
          </div>
          <div className="flex w-full flex-col justify-center gap-4">
            <Label htmlFor="password" className="text-md">
              Password
            </Label>
            <Controller name="password" control={control} rules={{ required: true }} render={({ field }) => <Input type="password" {...field} />} />
          </div>
        </div>
        <DialogFooter>
          <Button
            size="lg"
            className="hover:text-white"
            variant="secondary"
            isAnimated={false}
            type="submit"
            disabled={isSubmitting || isLoading}
            isLoading={isSubmitting || isLoading}
          >
            Submit
          </Button>
        </DialogFooter>
      </form>
    </GenericModal>
  )
}
