import Image from "next/image"
import Link from "next/link"
import { TextImageGridItem } from "../types"

interface TextImageGridVariantProps {
  items: TextImageGridItem[]
}

export function TextImageGridVariant({ items }: TextImageGridVariantProps) {
  if (!items) return null

  const textItems = items.filter((item) => !item.image)
  const imageItems = items.filter((item) => item.image).slice(0, 3)

  return (
    <div className="mx-auto mb-10 mt-20 flex w-full max-w-container-md flex-wrap justify-between gap-4 px-4 md:my-0 md:flex-nowrap md:gap-10 md:py-14 xl:px-0">
      <div className="flex w-full flex-col gap-2 text-center md:w-1/2 md:text-left">
        <ul>
          {textItems.map((item) => (
            <li key={item.text} className="text-[22px] hover:underline">
              <Link prefetch={false} href={item.href || "#"}>
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="grid w-full grid-cols-[repeat(_auto-fit,minmax(160px,1fr)_)] gap-8 md:w-1/2">
        {imageItems.map((singleCategory) => (
          <Link prefetch={false} href={singleCategory.href || "#"} className="submenu__inner flex flex-col items-center gap-4" key={singleCategory.text}>
            <Image
              className="h-[200px] w-[160px] rounded-md bg-neutral-200 object-cover transition-transform hover:scale-105"
              src={singleCategory.image!}
              width={160}
              height={200}
              alt={singleCategory.text!}
            />
            <p className="text-center text-[20px] text-slate-800 hover:underline">{singleCategory.text}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
