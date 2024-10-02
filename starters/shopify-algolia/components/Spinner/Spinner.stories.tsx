import type { Meta, StoryObj } from "@storybook/react"
import { Spinner } from "./Spinner"

const meta: Meta<typeof Spinner> = {
  title: "Spinner",
  component: Spinner,
  args: {},
  argTypes: {},
}

type Story = StoryObj<typeof Spinner>

export const Default: Story = {
  render: () => <Spinner />,
}

export default meta
