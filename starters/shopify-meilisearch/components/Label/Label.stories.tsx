import type { Meta, StoryObj } from "@storybook/react"
import { Label } from "./Label"

const meta: Meta<typeof Label> = {
  title: "Label",
  component: Label,
  args: {},
  argTypes: {},
}

type Story = StoryObj<typeof Label>

export const Default: Story = {
  render: () => <Label>Hello world</Label>,
}

export default meta
