import type { Meta, StoryObj } from "@storybook/react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./DropdownMenu"

const meta: Meta<typeof DropdownMenu> = {
  title: "DropdownMenu",
  component: DropdownMenu,
  args: {},
  argTypes: {},
}

type Story = StoryObj<typeof DropdownMenu>

export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-transparent">Dropdown menu</DropdownMenuTrigger>
      <DropdownMenuContent className="my-0 w-[240px] rounded-b-md bg-white p-0 text-neutral-500 shadow-lg" align="end">
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Item 1</DropdownMenuItem>
        <DropdownMenuItem>Item 2</DropdownMenuItem>
        <DropdownMenuItem>Item 3</DropdownMenuItem>
        <DropdownMenuItem>Item 4</DropdownMenuItem>
        <DropdownMenuItem>Item 5</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

export default meta
