import Image from "next/image"
import Link from "next/link"
import { ImageGridItem } from "../types"

interface ImageGridVariantProps {
  items: ImageGridItem[]
}

export function ImageGridVariant({ items }: ImageGridVariantProps) {
  if (!items) return null

  return (
    <div className="mx-auto mb-10 mt-20 grid w-full max-w-container-md grid-cols-[repeat(_auto-fit,minmax(200px,1fr)_)] gap-8 px-4 md:my-0 md:py-14 xl:px-0">
      {items.map((singleCategory) => (
        <Link prefetch={false} href={singleCategory.href} className="submenu__inner flex flex-col items-center gap-4" key={singleCategory.text}>
          <Image
            className="h-[150px] w-[200px] rounded-md bg-neutral-200 object-cover transition-transform hover:scale-105"
            src={singleCategory.image}
            width={200}
            height={150}
            alt={singleCategory.text}
          />
          <p className="text-center text-[20px] text-slate-800 hover:underline">{singleCategory.text}</p>
        </Link>
      ))}
    </div>
  )
}
