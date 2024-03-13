import { signupUser } from "app/actions"
import { storefrontClient } from "clients/storefrontClient"
import { Button } from "components/Button"
import { DialogFooter } from "components/Dialog"
import { GenericModal } from "components/GenericModal"
import { Input } from "components/Input"
import { Label } from "components/Label"
import { Logo } from "components/Logo"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { useModalStore } from "stores/modalStore"

interface SignupInputs {
  email: string
  password: string
}

export function SignupModal() {
  const modals = useModalStore((s) => s.modals)
  const closeModal = useModalStore((s) => s.closeModal)
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isLoading },
  } = useForm<SignupInputs>()

  async function onSubmit(payload: SignupInputs) {
    const { email, password } = payload
    const user = await signupUser({ email, password })

    if (user) {
      closeModal("signup")
      toast.success("You have successfully signed up! Please check your email for a confirmation link.")
      return
    }

    toast.error("Couldn't create user. The email address may be already in use.")
  }

  return (
    <GenericModal title="Signup" open={!!modals["signup"]} onOpenChange={() => closeModal("signup")}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Logo className="mt-6 flex size-24 w-full justify-center" />
        <div className="flex w-full flex-col items-center gap-6 px-0 py-4 md:px-2 md:pt-8">
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
