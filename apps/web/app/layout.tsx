import "./globals.css"

import dynamic from "next/dynamic"
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
import { Cart } from "views/Cart/Cart"
import { FlagValues } from "views/FlagValues"
import { NavigationEvents } from "views/NavigationEvents"
import { ThirdParties } from "views/ThirdParties"
import { env } from "env.mjs"
import { Metadata } from "next"
import { GithubBadge } from "views/GithubBadge"
import { DemoModeAlert } from "views/DemoModeAlert"

const DraftToolbar = dynamic(() => import("views/DraftToolbar"), { ssr: false })

export const revalidate = 3600

const navigationItems: NavItem[] = [
  {
    text: "Home",
    href: "/",
  },
  {
    text: "Fashion",
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
]

export const metadata: Metadata = {
  title: "Next.js Enterprise Commerce | Blazity",
  description: "AI-FIRST NEXT.JS STOREFRONT FOR COMPOSABLE COMMERCE",
  metadataBase: new URL(env.LIVE_URL!),
  openGraph: {
    title: "Next.js Enterprise Commerce | Blazity",
    description: "AI-FIRST NEXT.JS STOREFRONT FOR COMPOSABLE COMMERCE",
    images: ["/twitter-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Next.js Enterprise Commerce | Blazity",
    description: "AI-FIRST NEXT.JS STOREFRONT FOR COMPOSABLE COMMERCE",
    creator: "@blazity",
    images: ["/twitter-image.png"],
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
        <Script id="mobileMegaMenuLogic" strategy="beforeInteractive">{`${mobileInlineScript}`}</Script>

        <TopBar />
        <NavigationBar items={navigationItems} />

        {children}

        <CallToAction />
        <Footer />
        <Modals />
        <Suspense fallback={null}>
          <Cart />
        </Suspense>

        <Suspense fallback={null}>
          <NavigationEvents />
        </Suspense>

        <Toaster position="bottom-left" />

        <DraftToolbar />

        <Suspense fallback={null}>
          <FlagValues />
        </Suspense>

        <Suspense fallback={null}>
          <ThirdParties />
        </Suspense>

        <GithubBadge />
        <DemoModeAlert />
      </body>
    </html>
  )
}
