import type { Meta, StoryObj } from "@storybook/react"
import { LoadingDots } from "./LoadingDots"

const meta: Meta<typeof LoadingDots> = {
  title: "LoadingDots",
  component: LoadingDots,
  args: {},
  argTypes: {},
}

type Story = StoryObj<typeof LoadingDots>

export const Default: Story = {
  render: () => <LoadingDots />,
}

export default meta
