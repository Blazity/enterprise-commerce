import type { Meta, StoryObj } from "@storybook/react"
import { AnnouncementBar } from "./AnnouncementBar"

const meta: Meta<typeof AnnouncementBar> = {
  title: "AnnouncementBar",
  component: AnnouncementBar,
  args: {},
  argTypes: {},
}

type Story = StoryObj<typeof AnnouncementBar>

export const Default: Story = {
  render: () => <AnnouncementBar />,
}

export default meta
