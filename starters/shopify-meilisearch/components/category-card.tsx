import Image from "next/image"
import Link from "next/link"
import { PlatformCollection } from "lib/shopify/types"
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
          src={image?.url || `/category-placeholder-${index}.png`}
          alt={image?.altText || `${title} category`}
          className="transition-transform group-hover:scale-105"
          style={{
            objectFit: "contain",
          }}
          fill
        />
        <div className="absolute left-0 top-0 z-10 size-full bg-gradient-to-b from-white/90 to-60%" />
      </div>
      <div className="absolute inset-x-4 top-0 z-20">
        <h3 className="ml-3 mt-5 text-xl font-semibold text-black group-hover:text-orange-500">{title}</h3>
      </div>
    </Link>
  )
}
