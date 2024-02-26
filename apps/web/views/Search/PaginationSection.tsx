import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "components/Pagination"

const PAGE_OFFSET = 2

interface PaginationSectionProps {
  queryParams: Record<string, string | string[] | undefined | number>
  totalPages: number
}

export function PaginationSection({ queryParams, totalPages }: PaginationSectionProps) {
  const { page = 1 } = queryParams

  let startPage = +page - PAGE_OFFSET
  let endPage = +page + PAGE_OFFSET

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
    <Pagination className="my-32 border-t border-black py-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious disabled={+page === 1} href={{ query: { ...queryParams, page: +page - 1 } }} />
        </PaginationItem>
        {pages.map((singlePage, idx) => (
          <PaginationItem key={"pagination_item" + idx + singlePage}>
            <PaginationLink isActive={singlePage === +page} href={{ query: { ...queryParams, page: singlePage } }}>
              {singlePage}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext disabled={+page === totalPages} href={{ query: { ...queryParams, page: +page + 1 } }} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
