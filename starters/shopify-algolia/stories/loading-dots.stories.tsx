import type { Meta, StoryObj } from "@storybook/react"
import { LoadingDots } from "components/loading-dots"

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
