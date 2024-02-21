import Image from "next/image"
import Link from "next/link"
import Script from "next/script"

import { cn } from "utils/cn"
import { mobileInlineScript } from "./mobile-inline-script"
import { ImageGridItem, NavItem, TextGridItem, TextImageGridItem } from "./types"

interface NavigationBarProps {
  items: NavItem[]
}

export function NavigationBar({ items }: NavigationBarProps) {
  return (
    <nav className="mega-navbar relative mx-auto my-0 flex w-full flex-wrap content-center items-center justify-between border-b border-black py-6 md:border md:py-8">
      <div className="md:max-w-container-md flex justify-start px-4 md:mx-auto md:w-full md:px-0">
        <Script id="mobileMegaMenuLogic">{`${mobileInlineScript}`}</Script>
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
        <section className="navbar__center md:justify-center">
          <span className="overlay"></span>
          <div className="menu" id="menu">
            <div className="menu__header">
              <span className="menu__arrow">
                <i>
                  <svg className="rotate-90" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.999876 1.03964L4.89244 4.89256L8.74536 1" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </i>
              </span>
              <span className="menu__title"></span>
            </div>

            <ul className="menu__inner flex flex-col gap-8 px-4 md:flex-row md:items-center md:justify-start md:gap-12 xl:px-0">
              {items.map((singleMenuItem) => (
                <li className={cn("menu__item", { menu__dropdown: !!singleMenuItem.submenu })} key={singleMenuItem.text}>
                  <a href={singleMenuItem.href || "#"} className="menu__link text-[22px] hover:underline md:text-[16px]">
                    {singleMenuItem.text}
                    {singleMenuItem.submenu ? (
                      <i>
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0.999876 1.03964L4.89244 4.89256L8.74536 1" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </i>
                    ) : null}
                  </a>

                  <div className="submenu megamenu__text w-full border-b border-black shadow-sm">
                    {singleMenuItem.submenu?.variant === "text-grid" && <TextGridVariant items={singleMenuItem.submenu.items as TextGridItem[]} />}
                    {singleMenuItem.submenu?.variant === "image-grid" && <ImageGridVariant items={singleMenuItem.submenu.items as ImageGridItem[]} />}
                    {singleMenuItem.submenu?.variant === "text-image-grid" && <TextImageGridVariant items={singleMenuItem.submenu.items as TextImageGridItem[]} />}
                  </div>
                </li>
              ))}
            </ul>

            {/* <div className="relative mt-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="size-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="table-search"
                className="block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Search for items"
              />
            </div> */}
          </div>
        </section>
      </div>
    </nav>
  )
}

function TextGridVariant({ items }: { items: TextGridItem[] }) {
  if (!items) return null

  return (
    <div className="max-w-container-md mx-auto my-20 grid w-full grid-cols-[repeat(_auto-fit,minmax(250px,1fr)_)] gap-8 px-4 md:my-0 md:py-14 xl:px-0">
      {items.map((singleCategory) => (
        <div className="submenu__inner flex w-full flex-col gap-4" key={singleCategory.text}>
          <h4 className="submenu__title text-[22px]">{singleCategory.text}</h4>
          <ul className="submenu__list flex flex-col items-start justify-start gap-2 text-left">
            {singleCategory?.items?.map((item) => (
              <li key={item.text} className="hover:underline">
                <Link href={item.href}>{item.text}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

function ImageGridVariant({ items }: { items: ImageGridItem[] }) {
  if (!items) return null

  return (
    <div className="max-w-container-md mx-auto my-20 grid w-full grid-cols-[repeat(_auto-fit,minmax(200px,1fr)_)] gap-8 px-4 md:my-0 md:py-14 xl:px-0">
      {items.map((singleCategory) => (
        <Link href={singleCategory.href} className="submenu__inner flex flex-col items-center gap-4" key={singleCategory.text}>
          <Image
            className="h-[150px] w-[200px] rounded-md bg-gray-200 object-cover transition-transform hover:scale-105"
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

function TextImageGridVariant({ items }: { items: TextImageGridItem[] }) {
  if (!items) return null

  const textItems = items.filter((item) => !item.image)
  const imageItems = items.filter((item) => item.image).slice(0, 3)

  return (
    <div className="max-w-container-md mx-auto my-20 flex w-full flex-wrap justify-between gap-4 px-4 md:my-0 md:flex-nowrap md:gap-10 md:py-14 xl:px-0">
      <div className="flex w-full flex-col gap-2 text-center md:w-1/2 md:text-left">
        <ul>
          {textItems.map((item) => (
            <li key={item.text} className="text-[22px] hover:underline">
              <Link href={item.href || "#"}>{item.text}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="grid w-full grid-cols-[repeat(_auto-fit,minmax(160px,1fr)_)] gap-8 md:w-1/2">
        {imageItems.map((singleCategory) => (
          <Link href={singleCategory.href || "#"} className="submenu__inner flex flex-col items-center gap-4" key={singleCategory.text}>
            <Image
              className="h-[200px] w-[160px] rounded-md bg-gray-200 object-cover transition-transform hover:scale-105"
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
