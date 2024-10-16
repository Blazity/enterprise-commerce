import type { Meta, StoryObj } from "@storybook/react"
import { Label } from "components/ui/label"
import { Input } from "components/ui/input"

const meta: Meta<typeof Input> = {
  title: "Input",
  component: Input,
  args: {},
  argTypes: {},
}

type Story = StoryObj<typeof Input>

export const Default: Story = {
  render: () => (
    <Label>
      Hello world
      <Input />
    </Label>
  ),
}

export default meta
