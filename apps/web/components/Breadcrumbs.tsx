import Link from "next/link"
import { cn } from "utils/cn"

interface BreadcrumbsProps {
  items: Record<string, string>
  className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex items-center gap-1.5 text-[16px] tracking-[-0.64px]">
        {Object.entries(items).map(([title, href], idx) => {
          const isLast = idx + 1 === Object.keys(items).length

          return (
            <>
              <li>
                <Link prefetch={false} aria-current={isLast ? "page" : undefined} className={cn("text-slate-600 hover:underline", { "font-medium": isLast })} href={href}>
                  {title}
                </Link>
              </li>
              {isLast ? null : <li>{`>`}</li>}
            </>
          )
        })}
      </ol>
    </nav>
  )
}
