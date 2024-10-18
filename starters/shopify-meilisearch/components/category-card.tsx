import { ChevronIcon } from "components/icons/chevron-icon"
import { PlatformCollection } from "lib/shopify/types"
import Image from "next/image"
import Link from "next/link"
import { cn } from "utils/cn"

interface CategoryCardProps extends Pick<PlatformCollection, "title" | "image" | "handle"> {
  index: number
  className?: string
}

export const CategoryCard = ({ handle, image, title, index, className }: CategoryCardProps) => {
  const href = `/category/${handle}`
  return (
    <Link href={href} className={cn("group relative overflow-hidden rounded-lg transition-all hover:shadow-md", className)} prefetch={false}>
      <div className="relative aspect-video">
        <Image
          src={image?.url || `/category-placeholder-${index}.svg`}
          alt={image?.altText || `${title} category`}
          className="transition-transform group-hover:scale-105"
          style={{
            objectFit: "contain",
          }}
          fill
        />
      </div>
      <div className="absolute inset-x-4 top-0">
        <h3 className="ml-3 mt-5 text-xl font-semibold text-black group-hover:text-orange-500">{title}</h3>
        <span className="inline-flex items-center text-sm font-medium text-white">
          Shop now
          <ChevronIcon className="inset-x-4 ml-1 -rotate-90 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}
