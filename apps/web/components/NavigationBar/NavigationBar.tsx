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
import { CloseIcon } from "components/Icons/CloseIcon"
import { ProfileMenu } from "components/ProfileMenu/ProfileMenu"
import { SearchButton } from "./SearchButton"

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
          <div className="burger" id="burger">
            <span className="burger-line"></span>
            <span className="burger-line"></span>
            <span className="burger-line"></span>
          </div>
          <a href="/" className="brand flex items-center text-xl font-bold">
            Acme
          </a>
          <div className="menu-actions absolute right-4 flex items-center justify-center gap-2">
            <Favorites className="flex md:hidden" />
            <Suspense fallback={<Skeleton className="size-8" />}>
              <Cart className="flex md:hidden" />
            </Suspense>
            <SearchButton />
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
              <ul className="mt-10 flex w-full flex-col gap-8 px-4 md:mt-0 md:w-auto md:flex-row md:items-center md:justify-start xl:px-0">
                {itemsMarkup}

                <li className="mt-auto flex w-full justify-center pb-10 md:hidden">
                  <ProfileMenu />
                </li>
              </ul>
              <div className="relative ml-auto flex items-center">
                <div className="menu-close-button absolute right-3 top-0 md:hidden">
                  <CloseIcon className="size-5" />
                </div>
                <Autocomplete className="mr-6" />
                <div className="flex gap-2">
                  <Favorites className="hidden md:flex" />
                  <Cart className="hidden md:flex" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </nav>
  )
}
