import type { Meta, StoryObj } from "@storybook/react"
import { Footer } from "components/footer"

const meta: Meta<typeof Footer> = {
  title: "Footer",
  component: Footer,
  args: {},
  argTypes: {},
}

type Story = StoryObj<typeof Footer>

export const Default: Story = {
  render: () => <Footer />,
}

export default meta
