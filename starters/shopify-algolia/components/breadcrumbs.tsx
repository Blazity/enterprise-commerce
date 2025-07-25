import React from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "components/ui/breadcrumb"
import { cn } from "utils/cn"

interface BreadcrumbsProps {
  items: Record<string, string>
  className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <Breadcrumb className={className}>
      <BreadcrumbList className="no-scrollbar flex items-center gap-1.5 overflow-x-scroll  whitespace-nowrap text-xs  md:text-base/[18px]">
        {Object.entries(items).map(([title, href], idx) => {
          const isLast = idx + 1 === Object.keys(items).length

          return (
            <React.Fragment key={title + href}>
              <BreadcrumbItem>
                <BreadcrumbLink
                  prefetch={false}
                  aria-current={isLast ? "page" : undefined}
                  className={cn("text-sm text-neutral-500 hover:underline", isLast && "font-medium underline")}
                  href={href}
                >
                  {title}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator className="text-transparent [&>svg]:size-2 [&>svg]:fill-black" />}
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
