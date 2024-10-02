import type { Meta, StoryObj } from "@storybook/react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./Card"

const meta: Meta<typeof Card> = {
  title: "Card",
  component: Card,
  args: {},
  argTypes: {},
}

type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Card title</CardTitle>
      </CardHeader>
      <CardContent>
        Nulla occaecat est reprehenderit nostrud nulla sint tempor commodo excepteur ea. Proident aliquip non do adipisicing cillum enim non nulla aliquip. Adipisicing deserunt
        dolor est cupidatat sint laboris cillum laborum reprehenderit do. Laboris labore qui exercitation ea eiusmod. Reprehenderit laborum quis labore nulla. Ex culpa esse
        consequat aute ex non ad est cupidatat veniam. Nulla anim duis eu eiusmod sint nisi qui eu.
      </CardContent>
      <CardFooter>Card footer</CardFooter>
    </Card>
  ),
}

export default meta
