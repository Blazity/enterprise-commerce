import type { Meta, StoryObj } from "@storybook/react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./Dialog"

const meta: Meta<typeof Dialog> = {
  title: "Dialog",
  component: Dialog,
  args: {},
  argTypes: {},
}

type Story = StoryObj<typeof Dialog>

export const Default: Story = {
  render: () => (
    <Dialog open={true}>
      <DialogContent className={"max-w-[90%] bg-white sm:max-w-[425px] "}>
        <DialogHeader>
          <DialogTitle>Dialog title</DialogTitle>
        </DialogHeader>
        Hello world
      </DialogContent>
    </Dialog>
  ),
}

export default meta
