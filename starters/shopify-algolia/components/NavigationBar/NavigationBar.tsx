import { Suspense } from "react"
import { ChevronIcon } from "components/Icons/ChevronIcon"
import dynamic from "next/dynamic"

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
import { SearchButton } from "./SearchButton"
import { NavigationItem } from "./NavigationItem"
import Link from "next/link"

const ProductAddedAlert = dynamic(() => import("views/Product/ProductAddedAlert").then((mod) => mod.ProductAddedAlert))

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
      <NavigationItem singleMenuItem={singleMenuItem} />

      <div className="submenu megamenu__text w-full border-b border-black shadow-sm">
        <VariantGrid items={singleMenuItem.submenu?.items} variant={singleMenuItem.submenu?.variant} />
        <div className="submenu__inner flex w-full flex-col gap-4 md:hidden">
          <a href={singleMenuItem.href || "#"}>
            <h4 className="mb-20 text-center text-xl underline">See all {singleMenuItem.text}</h4>
          </a>
        </div>
      </div>
    </li>
  ))

  return (
    <header className="mega-navbar sticky top-0 z-50 mx-auto my-0 flex w-full flex-wrap content-center items-center justify-between border-b border-black bg-white py-6 md:border-y ">
      <div className="md:max-w-container-md flex justify-start px-4 md:mx-auto md:w-full md:px-0">
        <Link prefetch={false} href="/" className="brand mr-20 hidden items-center text-xl font-bold md:flex">
          Acme
        </Link>

        <section className="navbar__left flex w-full justify-between md:hidden">
          <button className="burger" id="burger" aria-label="open menu" aria-controls="menu">
            <span className="burger-line"></span>
            <span className="burger-line"></span>
            <span className="burger-line"></span>
          </button>
          <Link prefetch={false} href="/" className="brand flex items-center text-xl font-bold">
            Acme
          </Link>
          <div className="menu-actions absolute right-4 flex items-center justify-center gap-2">
            <Favorites className="flex md:hidden" />
            <Suspense fallback={<Skeleton className="size-8" />}>
              <Cart className="flex md:hidden" />
            </Suspense>
            <SearchButton />
          </div>
          <ProductAddedAlert className="md:hidden" />
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
              <ul className="mt-10 flex w-full flex-col gap-8 px-4 md:mt-0 md:w-auto md:flex-row md:items-center md:justify-start xl:px-0">{itemsMarkup}</ul>
              <div className="relative ml-auto flex items-center">
                <button className="menu-close-button absolute right-3 top-0 bg-transparent md:hidden" aria-label="close menu" aria-controls="menu">
                  <CloseIcon className="size-5" />
                </button>
                <Autocomplete className="mr-6" />
                <div className="flex gap-2">
                  <Favorites className="hidden md:flex" />
                  <Cart className="hidden md:flex" />
                  <ProductAddedAlert className="hidden md:block" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </header>
  )
}
