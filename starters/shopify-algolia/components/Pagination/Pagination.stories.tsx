import type { Meta, StoryObj } from "@storybook/react"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./Pagination"

const meta: Meta<typeof Pagination> = {
  title: "Pagination",
  component: Pagination,
  args: {},
  argTypes: {},
}

type Story = StoryObj<typeof Pagination>

export const Default: Story = {
  render: () => <ControlledStory />,
}

function ControlledStory() {
  const page = 1
  const totalPages = 10
  const pageOffset = 2

  let startPage = +page - pageOffset
  let endPage = +page + pageOffset

  if (startPage <= 0) {
    endPage -= startPage - 1
    startPage = 1
  }

  if (endPage > totalPages) {
    endPage = totalPages
  }

  const pages: (number | null)[] = []

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }

  if (pages.length === 1) {
    return null
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious disabled={+page === 1} href={{ query: { page: +page - 1 } }} />
        </PaginationItem>
        {pages.map((singlePage, idx) => (
          <PaginationItem key={"pagination_item" + idx + singlePage}>
            <PaginationLink aria-label={`Go to ${page} page`} isActive={singlePage === +page} href={{ query: { page: singlePage } }}>
              {singlePage}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext disabled={+page === totalPages} href={{ query: { page: +page + 1 } }} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default meta
