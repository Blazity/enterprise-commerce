"use client"

import { PlatformUser } from "@enterprise-commerce/core/platform/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { getCurrentUser, updateUser } from "app/actions/user.actions"
import { Button } from "components/Button/Button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "components/Card/Card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "components/Form/Form"
import { Input } from "components/Input/Input"

import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useUserStore } from "stores/userStore"
import { z } from "zod"

const formSchema = z.object({
  firstName: z.string().max(64).optional(),
  lastName: z.string().max(64).optional(),
  phone: z
    .string()
    .regex(/^\+(?:[0-9]?){6,14}[0-9]$/, "Number must match E164 format")
    .optional(),
})

const formFields = [
  { label: "First name", name: "firstName" },
  { label: "Last name", name: "lastName" },
  { label: "Phone", name: "phone" },
] as const

export function ProfileForm({ user }: { user: PlatformUser }) {
  const setUser = useUserStore((s) => s.setUser)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: user.firstName ?? undefined,
      lastName: user.lastName ?? undefined,
      phone: user.phone ?? undefined,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const hasAnyFilledIn = Object.values(values).find(Boolean)
    if (!hasAnyFilledIn) return

    const user = await updateUser(values)

    if (user?.id) {
      const currentUser = await getCurrentUser()
      currentUser && setUser(currentUser)

      toast.success("Updated the profile details")
      return
    }

    toast.error("Failed to update the profile details")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit profile</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form name="editProfileForm" id="editProfileForm" onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
            {formFields.map((singleField) => (
              <FormField
                key={singleField.name}
                control={form.control}
                name={singleField.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{singleField.label}</FormLabel>
                    <FormControl>
                      <Input className="text-sm" placeholder={`Enter ${singleField.label}`} {...field} />
                    </FormControl>
                    <FormMessage className="text-xs font-normal text-red-400" />
                  </FormItem>
                )}
              />
            ))}
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex items-center justify-end space-x-4 leading-4">
        <Button
          size="default"
          isAnimated={false}
          className="hover:text-white"
          variant="secondary"
          type="submit"
          form="editProfileForm"
          isLoading={form.formState.isSubmitting}
          disabled={form.formState.isSubmitting}
        >
          Submit
        </Button>
      </CardFooter>
    </Card>
  )
}
