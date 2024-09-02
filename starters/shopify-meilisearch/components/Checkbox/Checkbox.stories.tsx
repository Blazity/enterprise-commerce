import type { Meta, StoryObj } from "@storybook/react"
import { Label } from "components/Label/Label"
import { Checkbox } from "./Checkbox"

const meta: Meta<typeof Checkbox> = {
  title: "Checkbox",
  component: Checkbox,
  args: {},
  argTypes: {},
}

type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  render: () => (
    <Label className="flex items-center gap-2">
      <Checkbox />
      Hello world
    </Label>
  ),
}

export default meta
