import type { Meta, StoryObj } from "@storybook/react"
import { Skeleton } from "./Skeleton"

const meta: Meta<typeof Skeleton> = {
  title: "Skeleton",
  component: Skeleton,
  args: {},
  argTypes: {},
}

type Story = StoryObj<typeof Skeleton>

export const Default: Story = {
  render: () => <Skeleton className="size-80 border border-black" />,
}

export default meta
