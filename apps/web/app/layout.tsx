import "./globals.css"

import nextDynamic from "next/dynamic"
import Script from "next/script"
import { Suspense } from "react"
import { Toaster } from "sonner"
import { CallToAction } from "components/CallToAction/CallToAction"
import { Footer } from "components/Footer/Footer"
import { Modals } from "components/Modals/Modals"
import { mobileInlineScript } from "components/NavigationBar/mobileInlineScript"
import { NavigationBar } from "components/NavigationBar/NavigationBar"
import { NavItem } from "components/NavigationBar/types"
import { TopBar } from "components/TopBar/TopBar"
import { FlagValues } from "views/FlagValues"
import { ThirdParties } from "views/ThirdParties"
import { env } from "env.mjs"
import { Metadata } from "next"
import { GithubBadge } from "views/GithubBadge"
import { DemoModeAlert } from "views/DemoModeAlert"
import { CartView } from "views/Cart/CartView"

const DraftToolbar = nextDynamic(() => import("views/DraftToolbar"), { ssr: false })

export const revalidate = 3600

const navigationItems: NavItem[] = [
  {
    text: "Home",
    href: "/",
  },
  {
    text: "Fashion",
    href: "/category/fashion",
    submenu: {
      variant: "text-grid",
      items: [
        {
          text: "Women",
          items: [
            { text: "Shirts & Blouses", href: "/search" },
            { text: "Pants", href: "/search" },
            { text: "Blazers & Vests", href: "/search" },
            { text: "Cardigans & Sweaters", href: "/search" },
          ],
        },
        {
          text: "Men",
          items: [
            { text: "T-shirts & Tanks", href: "/search" },
            { text: "Pants", href: "/search" },
            { text: "Hoodies & Sweatshirts", href: "/search" },
            { text: "Blazers & Suits", href: "/search" },
          ],
        },
        {
          text: "Kids",
          items: [
            { text: "Clothing", href: "/search" },
            { text: "Outerwear", href: "/search" },
            { text: "Activewear", href: "/search" },
            { text: "Accessories", href: "/search" },
          ],
        },
      ],
    },
  },
  {
    text: "Electronics",
    href: "/category/electronics",
    submenu: {
      variant: "image-grid",
      items: [
        {
          href: "/category/electronics",
          image: "/menu/electronics-1.png",
          text: "Best Offers",
        },
        {
          href: "/category/electronics",
          image: "/menu/electronics-2.png",
          text: "New",
        },
        {
          href: "/category/electronics",
          image: "/menu/electronics-3.png",
          text: "Holiday",
        },
        {
          href: "/category/electronics",
          image: "/menu/electronics-4.png",
          text: "Sale",
        },
      ],
    },
  },
  {
    text: "Beauty",
    href: "/category/beauty",
    submenu: {
      variant: "text-image-grid",
      items: [
        { text: "Women", href: "/search" },
        { text: "Men", href: "/search" },
        { text: "Kids", href: "/search" },
        { text: "Sport", href: "/search" },
        { text: "T-shirts & Tanks", href: "/search" },
        { text: "Pants", href: "/search" },
        { text: "Hoodies & Sweatshirts", href: "/search" },
        { text: "Blazers & Suits", href: "/search" },
        {
          href: "#",
          image: "/menu/beauty-1.png",
          text: "Home",
        },
        {
          href: "#",
          image: "/menu/beauty-2.png",
          text: "Beauty",
        },
        {
          href: "#",
          image: "/menu/beauty-3.png",
          text: "Holiday",
        },
      ],
    },
  },
  {
    text: "Furniture",
    href: "/category/furniture",
    submenu: {
      variant: "image-grid",
      items: [
        {
          href: "/category/furniture",
          image: "/menu/furniture-1.png",
          text: "Decor",
        },
        {
          href: "/category/furniture",
          image: "/menu/furniture-2.png",
          text: "Furniture",
        },
        {
          href: "/category/furniture",
          image: "/menu/furniture-3.png",
          text: "Bags",
        },
        {
          href: "/category/furniture",
          image: "/menu/furniture-4.png",
          text: "Sofas",
        },
      ],
    },
  },
]

export const metadata: Metadata = {
  title: "Next.js Enterprise Commerce | Blazity",
  description: "AI-FIRST NEXT.JS STOREFRONT FOR COMPOSABLE COMMERCE",
  metadataBase: new URL(env.LIVE_URL!),
  openGraph: {
    title: "Next.js Enterprise Commerce | Blazity",
    description: "AI-FIRST NEXT.JS STOREFRONT FOR COMPOSABLE COMMERCE",
    images: ["/opengraph-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Next.js Enterprise Commerce | Blazity",
    description: "AI-FIRST NEXT.JS STOREFRONT FOR COMPOSABLE COMMERCE",
    creator: "@blazity",
    images: ["/opengraph-image.jpg"],
  },
  verification: {
    google: "google",
    yandex: "yandex",
    yahoo: "yahoo",
  },
  generator: "Next.js",
  applicationName: "Next.js",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Script id="mobileMegaMenuLogic" strategy="lazyOnload">{`${mobileInlineScript}`}</Script>

        <TopBar />
        <NavigationBar items={navigationItems} />

        {children}

        <CallToAction />
        <Footer />
        <Modals />

        <CartView />

        <Toaster position="bottom-left" />

        <DraftToolbar />

        <Suspense>
          <FlagValues />
        </Suspense>

        <Suspense>
          <ThirdParties />
        </Suspense>

        <GithubBadge />
        <DemoModeAlert />
      </body>
    </html>
  )
}
