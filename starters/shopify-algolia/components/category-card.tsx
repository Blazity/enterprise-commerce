import Image from "next/image"
import Link from "next/link"
import { PlatformCollection } from "lib/shopify/types"
import { cn } from "utils/cn"

interface CategoryCardProps extends Pick<PlatformCollection, "title" | "image" | "handle"> {
  index: number
  className?: string
  href?: string
}

export const CategoryCard = ({ handle, image, title, index, className, href }: CategoryCardProps) => {
  const path = href || `/category/${handle}`
  return (
    <Link href={path} className={cn("group relative overflow-hidden rounded-lg", className)} prefetch={false}>
      <div className="relative aspect-video">
        <Image
          src={image?.url || `/category-placeholder-${index}.png`}
          alt={image?.altText || `${title} category`}
          className="transition-transform duration-300 group-hover:scale-[1.02]"
          style={{
            objectFit: "contain",
          }}
          fill
        />
        <div className="absolute left-0 top-0 z-10 size-full bg-gradient-to-b from-white/90 to-60% opacity-50 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      <div className="absolute inset-x-4 top-0 z-20">
        <h3 className="ml-3 mt-5 origin-left text-2xl font-semibold text-primary opacity-0 transition-all duration-300 group-hover:opacity-100">{handle}</h3>
      </div>
    </Link>
  )
}
