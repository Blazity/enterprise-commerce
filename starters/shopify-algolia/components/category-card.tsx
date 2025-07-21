import Image from "next/image"
import Link from "next/link"
import { cn } from "utils/cn"

interface CategoryCardProps {
  title: string
  handle: string
  href: string
  description: string
  index: number
  className?: string
}

export const CategoryCard = ({ title, href, description, index, className }: CategoryCardProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex h-[320px] flex-col overflow-hidden rounded-lg border border-border bg-background transition-all duration-300 hover:border-foreground/20 hover:shadow-lg",
        className
      )}
      prefetch={false}
    >
      <div className="relative h-[200px] overflow-hidden bg-secondary/10">
        <Image
          src={`/category-placeholder-${index + 1}.png`}
          alt={`${title} category`}
          className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          priority={index < 4}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
            {title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{description}</p>
        </div>

        <div className="mt-4 flex items-center text-sm font-medium text-foreground">
          <span className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-foreground after:transition-all after:duration-300 group-hover:after:w-full">
            Shop Now
          </span>
          <svg
            className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
      </div>
    </Link>
  )
}
