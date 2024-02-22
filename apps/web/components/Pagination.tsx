import * as React from "react"

import { cn } from "utils/cn"
import { buttonVariants } from "./Button"

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav role="navigation" aria-label="pagination" className={cn("mx-auto flex w-full justify-center", className)} {...props} />
)
Pagination.displayName = "Pagination"

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(({ className, ...props }, ref) => (
  <ul ref={ref} className={cn("flex flex-row items-center gap-1", className)} {...props} />
))
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(({ className, ...props }, ref) => <li ref={ref} className={cn("", className)} {...props} />)
PaginationItem.displayName = "PaginationItem"

type PaginationLinkProps = {
  isActive?: boolean
} & React.ComponentProps<"button">

const PaginationLink = ({ className, isActive, ...props }: PaginationLinkProps) => (
  <button aria-current={isActive ? "page" : undefined} className={cn(buttonVariants({}), className)} {...props} />
)
PaginationLink.displayName = "PaginationLink"

const PaginationPrevious = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label="Go to previous page" className={cn("gap-1 pl-2.5", className)} {...props}>
    {"<"}
    <span>Previous</span>
  </PaginationLink>
)
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label="Go to next page" className={cn("gap-1 pr-2.5", className)} {...props}>
    <span>Next</span>
    {">"}
  </PaginationLink>
)
PaginationNext.displayName = "PaginationNext"

export { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious }
