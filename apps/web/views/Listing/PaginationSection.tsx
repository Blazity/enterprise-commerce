import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "components/Pagination/Pagination"
import { cn } from "utils/cn"

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
      <PaginationContent className="relative">
        <PaginationItem>
          <PaginationPrevious disabled={+page === 1} href={{ query: { ...queryParams, page: +page - 1 } }} />
        </PaginationItem>
        {pages.map((singlePage, idx) => (
          <PaginationItem key={"pagination_item" + idx + singlePage}>
            <PaginationLink
              className={cn(singlePage === +page && "absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 md:static md:transform-none")}
              aria-label={`Go to ${page} page`}
              isActive={singlePage === +page}
              href={{ query: { ...queryParams, page: singlePage } }}
            >
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
