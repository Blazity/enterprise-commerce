import type { Meta, StoryObj } from "@storybook/react"
import { useForm } from "react-hook-form"
import { Input } from "components/Input/Input"
import { Logo } from "components/Logo/Logo"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./Form"

const meta: Meta<typeof Form> = {
  title: "Form",
  component: Form,
  args: {},
  argTypes: {},
}

type Story = StoryObj<typeof Form>

const formFields = [
  { label: "Email", name: "email", type: "text" },
  { label: "Password", name: "password", type: "password" },
] as const

export const Default: Story = {
  render: () => <ControlledStory />,
}

function ControlledStory() {
  const form = useForm()

  return (
    <Form {...form}>
      <Logo className="mt-6 flex size-24 w-full justify-center" />
      <form name="loginForm" id="loginForm" className="space-y-1">
        {formFields.map((singleField) => (
          <FormField
            key={singleField.name}
            name={singleField.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{singleField.label}</FormLabel>
                <FormControl>
                  <Input type={singleField.type} className="text-sm" placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage className="text-xs font-normal text-red-400" />
              </FormItem>
            )}
          />
        ))}
      </form>
    </Form>
  )
}

export default meta
