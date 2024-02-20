"use client"

import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "components/Pagination"
import { parseAsInteger, useQueryState } from "nuqs"

export function PaginationSection({ totalPages }: { totalPages: number }) {
  const [page, setPage] = useQueryState("page", { ...parseAsInteger, defaultValue: 1, shallow: false, history: "push", clearOnDefault: true })

  if (totalPages === 1) {
    return null
  }

  return (
    <Pagination className="flex flex-col items-center justify-center">
      <div>
        Page {page} of {totalPages}
      </div>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious disabled={page === 1} onClick={() => setPage(page - 1)} />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext disabled={page === totalPages} onClick={() => setPage(page + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
