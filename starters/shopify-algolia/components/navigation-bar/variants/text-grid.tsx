"use client"

import Link from "next/link"
import { TextGridItem } from "../types"
import { usePathname } from "next/navigation"

interface TextGridVariantProps {
  items: TextGridItem[]
}

export function TextGridVariant({ items }: TextGridVariantProps) {
  const pathname = usePathname()
  const isAi = pathname.startsWith("/ai")

  if (!items?.length) return null

  return (
    <div className="mx-auto mb-10 mt-20 grid w-full max-w-container-md grid-cols-[repeat(_auto-fit,minmax(250px,1fr)_)] gap-8 @sm:px-8 @7xl:px-0 md:my-0 md:py-14">
      {items.map((singleCategory) => (
        <div className="submenu__inner flex w-full flex-col gap-4" key={singleCategory.text}>
          {singleCategory.href ? (
            <Link href={`${isAi ? "/ai" : ""}${singleCategory.href}`} prefetch={false}>
              <h4 className="submenu__title text-[22px] font-semibold underline-offset-4 hover:underline">
                {singleCategory.text}
              </h4>
            </Link>
          ) : (
            <h4 className="submenu__title text-[22px] font-semibold">{singleCategory.text}</h4>
          )}
          <ul className="submenu__list flex flex-col items-start justify-start gap-2 text-left">
            {singleCategory?.items?.map((item) => (
              <li key={item.text}>
                <Link
                  href={`${isAi ? "/ai" : ""}${item.href}`}
                  prefetch={false}
                  className=" underline-offset-4 hover:underline"
                >
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
