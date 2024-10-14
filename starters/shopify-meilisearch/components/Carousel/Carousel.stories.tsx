/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import type { Meta, StoryObj } from "@storybook/react"
import { Carousel, CarouselContent } from "./Carousel"

const meta: Meta<typeof Carousel> = {
  title: "Carousel",
  component: Carousel,
  args: {},
  argTypes: {},
}

type Story = StoryObj<typeof Carousel>

export const Default: Story = {
  render: () => (
    <Carousel opts={{ skipSnaps: true }}>
      <CarouselContent className="ml-0 justify-start gap-8">
        {Array.from({ length: 8 }, (product, idx) => (
          <img src="https://picsum.photos/200/300" key={idx} alt="" />
        ))}
      </CarouselContent>
    </Carousel>
  ),
}

export default meta
