import Link, { LinkProps } from "next/link"
import * as React from "react"

import { cn } from "utils/cn"
import { ButtonProps, buttonVariants } from "./button-old"
import { ChevronIcon } from "../icons/chevron-icon"

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav role="navigation" aria-label="pagination" className={cn("mx-auto flex w-full justify-center", className)} {...props} />
)
Pagination.displayName = "Pagination"

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(({ className, ...props }, ref) => (
  <ul ref={ref} className={cn("flex flex-row items-center gap-6", className)} {...props} />
))
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(({ className, ...props }, ref) => <li ref={ref} className={cn("", className)} {...props} />)
PaginationItem.displayName = "PaginationItem"

type PaginationLinkProps = {
  isActive?: boolean
  className?: string
  children?: React.ReactNode
  disabled?: boolean
  "aria-label"?: string
} & Pick<ButtonProps, "size"> &
  LinkProps

const PaginationLink = ({ className, isActive, children, href, disabled, "aria-label": ariaLabel }: PaginationLinkProps) => (
  <Link
    prefetch={false}
    scroll={false}
    aria-current={isActive ? "page" : undefined}
    aria-label={ariaLabel}
    className={cn(
      buttonVariants({
        variant: "ghost",
      }),
      "size-9 items-center justify-center bg-white px-0 py-0 text-[16px] text-slate-800 transition-colors hover:bg-black hover:text-white md:flex",
      { "bg-black font-bold text-white": isActive },
      { "pointer-events-none cursor-not-allowed opacity-50": disabled },
      className
    )}
    href={href}
  >
    {children}
  </Link>
)
PaginationLink.displayName = "PaginationLink"

const PaginationPrevious = ({ className, disabled, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn("flex size-8 items-center justify-center border-0 px-0 py-0 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50", className)}
    disabled={disabled}
    {...props}
  >
    <ChevronIcon className="size-3 rotate-90" />
  </PaginationLink>
)
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = ({ className, disabled, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn(
      "flex size-8 items-center justify-center border-0 px-0 py-0 transition-transform disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    disabled={disabled}
    {...props}
  >
    <ChevronIcon className="size-3 -rotate-90" />
  </PaginationLink>
)
PaginationNext.displayName = "PaginationNext"

export { Pagination, PaginationContent, PaginationLink, PaginationItem, PaginationPrevious, PaginationNext }
