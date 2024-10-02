import type { Meta, StoryObj } from "@storybook/react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./Select"

const meta: Meta<typeof Select> = {
  title: "Select",
  component: Select,
  args: {},
  argTypes: {},
}

const values = ["Item A", "Item B", "Item C", "Item D", "Item E", "Item F"]

type Story = StoryObj<typeof Select>

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={`Select something`} />
      </SelectTrigger>
      <SelectContent>
        {values.map((option) => {
          return (
            <SelectItem className={"hover:bg-neutral-50 focus:bg-neutral-50 active:bg-neutral-50"} key={option} value={option}>
              <span>{option}</span>
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  ),
}

export default meta
