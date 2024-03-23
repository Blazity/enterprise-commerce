import type { Meta, StoryObj } from "@storybook/react"
import { Breadcrumbs } from "./Breadcrumbs"

const meta: Meta<typeof Breadcrumbs> = {
  title: "Breadcrumbs",
  component: Breadcrumbs,
  args: {},
  argTypes: {},
}

type Story = StoryObj<typeof Breadcrumbs>

export const Default: Story = {
  render: () => <Breadcrumbs items={{ Home: "/", "Next Level": "/next-level", "Another Level": "/another-level-here" }} />,
}

export default meta
