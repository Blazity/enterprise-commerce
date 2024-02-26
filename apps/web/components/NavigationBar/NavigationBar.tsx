import { ChevronIcon } from "components/Icons/ChevronIcon"

import { cn } from "utils/cn"
import { Autocomplete } from "./Autocomplete"
import { Checkout } from "./Checkout"
import { Favorites } from "./Favorites"
import { ImageGridItem, NavItem, TextGridItem, TextImageGridItem } from "./types"
import { ImageGridVariant } from "./variants/ImageGridVariant"
import { TextGridVariant } from "./variants/TextGridVariant"
import { TextImageGridVariant } from "./variants/TextImageGridVariant"

interface NavigationBarProps {
  items: NavItem[]
}

export function NavigationBar({ items }: NavigationBarProps) {
  const itemsMarkup = items.map((singleMenuItem) => (
    <li className={cn("menu__item", { menu__dropdown: !!singleMenuItem.submenu })} key={singleMenuItem.text}>
      <a href={singleMenuItem.href || "#"} className="menu__link text-[22px] hover:underline md:text-[16px]">
        {singleMenuItem.text}
        {singleMenuItem.submenu ? (
          <i>
            <ChevronIcon />
          </i>
        ) : null}
      </a>

      <div className="submenu megamenu__text w-full border-b border-black shadow-sm">
        {singleMenuItem.submenu?.variant === "text-grid" && <TextGridVariant items={singleMenuItem.submenu.items as TextGridItem[]} />}
        {singleMenuItem.submenu?.variant === "image-grid" && <ImageGridVariant items={singleMenuItem.submenu.items as ImageGridItem[]} />}
        {singleMenuItem.submenu?.variant === "text-image-grid" && <TextImageGridVariant items={singleMenuItem.submenu.items as TextImageGridItem[]} />}
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
                  <Checkout />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </nav>
  )
}
