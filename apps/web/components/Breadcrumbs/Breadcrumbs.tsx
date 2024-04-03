import { ChevronIcon } from "components/Icons/ChevronIcon"
import Link from "next/link"
import React from "react"
import { cn } from "utils/cn"

interface BreadcrumbsProps {
  items: Record<string, string>
  className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="no-scrollbar flex items-center gap-1.5 overflow-x-scroll  whitespace-nowrap text-xs  md:text-base/[18px]">
        {Object.entries(items).map(([title, href], idx) => {
          const isLast = idx + 1 === Object.keys(items).length

          return (
            <React.Fragment key={title + href}>
              <li>
                <Link prefetch={false} aria-current={isLast ? "page" : undefined} className={cn("text-neutral-500 hover:underline", isLast && "font-medium underline")} href={href}>
                  {title}
                </Link>
              </li>
              {!isLast && (
                <li>
                  <ChevronIcon className="-rotate-90" />
                </li>
              )}
            </React.Fragment>
          )
        })}
      </ol>
    </nav>
  )
}
