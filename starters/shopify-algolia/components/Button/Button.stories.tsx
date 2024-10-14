import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "./Button"

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
  args: {
    variant: "primary",
    children: "Hello world",
    size: "default",
  },
  argTypes: {
    isAnimated: { control: { type: "boolean" } },
    isLoading: { control: { type: "boolean" } },
    variant: {
      options: ["primary", "secondary", "ghost", "outline"],
      control: { type: "select" },
    },
    size: {
      options: ["default", "lg", "xl"],
      control: { type: "select" },
    },
    children: { control: { type: "text" } },
  },
}

type Story = StoryObj<typeof Button>

export const Default: Story = {
  render: (args) => <Button {...args} />,
}

export default meta
