import Link from "next/link"
import { TextGridItem } from "../types"

interface TextGridVariantProps {
  items: TextGridItem[]
}

export function TextGridVariant({ items }: TextGridVariantProps) {
  if (!items?.length) return null

  return (
    <div className="max-w-container-md mx-auto mb-10 mt-20 grid w-full grid-cols-[repeat(_auto-fit,minmax(250px,1fr)_)] gap-8 px-4 md:my-0 md:py-14 xl:px-0">
      {items.map((singleCategory) => (
        <div className="submenu__inner flex w-full flex-col gap-4" key={singleCategory.text}>
          {singleCategory.href ? (
            <Link href={singleCategory.href} prefetch={false}>
              <h4 className="submenu__title text-[22px] underline">{singleCategory.text}</h4>
            </Link>
          ) : (
            <h4 className="submenu__title text-[22px]">{singleCategory.text}</h4>
          )}
          <ul className="submenu__list flex flex-col items-start justify-start gap-2 text-left">
            {singleCategory?.items?.map((item) => (
              <li key={item.text} className="hover:underline">
                <Link href={item.href} prefetch={false}>
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
