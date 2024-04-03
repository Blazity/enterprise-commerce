import { Suspense } from "react"
import { ChevronIcon } from "components/Icons/ChevronIcon"

import { cn } from "utils/cn"
import { Autocomplete } from "./Autocomplete"
import { Cart } from "./Cart"
import { Favorites } from "./Favorites"
import { ImageGridItem, NavItem, TextGridItem, TextImageGridItem } from "./types"
import { ImageGridVariant } from "./variants/ImageGridVariant"
import { TextGridVariant } from "./variants/TextGridVariant"
import { TextImageGridVariant } from "./variants/TextImageGridVariant"
import { Skeleton } from "components/Skeleton/Skeleton"

interface NavigationBarProps {
  items: NavItem[]
}

function VariantGrid({ variant, items }: { variant?: "text-grid" | "image-grid" | "text-image-grid"; items?: TextGridItem[] | ImageGridItem[] | TextImageGridItem[] }) {
  if (!items) return null

  switch (variant) {
    case "text-grid":
      return <TextGridVariant items={items as TextGridItem[]} />
    case "image-grid":
      return <ImageGridVariant items={items as ImageGridItem[]} />
    case "text-image-grid":
      return <TextImageGridVariant items={items as TextImageGridItem[]} />
    default:
      return null
  }
}

export function NavigationBar({ items }: NavigationBarProps) {
  const itemsMarkup = items.map((singleMenuItem) => (
    <li className={cn("menu__item", { menu__dropdown: !!singleMenuItem.submenu })} key={singleMenuItem.text}>
      <a href={singleMenuItem.href || "#"} className="menu__link text-[22px] hover:underline md:text-sm/[18px]">
        {singleMenuItem.text}
        {!!singleMenuItem.submenu && (
          <i>
            <ChevronIcon />
          </i>
        )}
      </a>

      <div className="submenu megamenu__text w-full border-b border-black shadow-sm">
        <VariantGrid items={singleMenuItem.submenu?.items} variant={singleMenuItem.submenu?.variant} />
      </div>
    </li>
  ))

  return (
    <nav className="mega-navbar relative mx-auto my-0 flex w-full flex-wrap content-center items-center justify-between border-b border-black py-6 md:border-y ">
      <div className="md:max-w-container-md flex justify-start px-4 md:mx-auto md:w-full md:px-0">
        <section className="navbar__left flex w-full justify-between md:hidden">
          <a href="/" className="brand flex items-center text-xl font-bold">
            Blazity
          </a>
          <div className="burger" id="burger">
            <span className="burger-line"></span>
            <span className="burger-line"></span>
            <span className="burger-line"></span>
          </div>
        </section>
        <section className="navbar__center w-full md:justify-center">
          <span className="overlay"></span>
          <div className="menu w-full" id="menu">
            <div className="menu__header">
              <span className="menu__arrow">
                <i className="rotate-90">
                  <ChevronIcon />
                </i>
              </span>
              <span className="menu__title"></span>
            </div>
            <div className="menu__inner flex w-full justify-between">
              <ul className="flex flex-col gap-8 px-4 md:flex-row md:items-center md:justify-start md:gap-12 xl:px-0">{itemsMarkup}</ul>
              <div className="ml-auto flex items-center">
                <Autocomplete className="mr-6" />
                <div className="flex gap-2">
                  <Favorites />
                  <Suspense fallback={<Skeleton className="size-8" />}>
                    <Cart />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </nav>
  )
}
