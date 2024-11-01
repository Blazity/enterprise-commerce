import "./globals.css"

import Script from "next/script"
import { Suspense } from "react"
import { Toaster } from "sonner"
import { FlagValues } from "components/flag-values"
import { ThirdParties } from "components/third-parties"
import { env } from "env.mjs"
import { Metadata } from "next"
import { GithubBadge } from "components/github-badge"
import { DemoModeAlert } from "components/demo-mode-alert"
import { CartView } from "components/cart/cart-view"
import type { NavItem } from "components/navigation-bar/types"
import { NavigationBar } from "components/navigation-bar/navigation-bar"
import { mobileInlineScript } from "components/navigation-bar/mobile-inline-script"
import { Footer } from "components/footer"
import { Modals } from "components/modals/modals"
import DraftToolbar from "components/draft-toolbar"

export const revalidate = 86400

const navigationItems: NavItem[] = [
  {
    text: "Fashion",
    href: "/category/fashion",
    submenu: {
      variant: "text-grid",
      items: [
        {
          text: "Women",
          href: "/category/women",
          items: [
            { text: "Shirts & Blouses", href: "/category/shirts-and-blouses" },
            { text: "Blazers & Vests", href: "/category/blazers-and-vests" },
            { text: "Cardigans & Sweaters", href: "/category/cardigans-and-sweaters" },
            { text: "Dresses", href: "/category/dresses" },
            { text: "Skirts", href: "/category/skirts" },
          ],
        },
        {
          text: "Men",
          href: "/category/men",
          items: [
            { text: "T-shirts & Tanks", href: "/category/t-shirts-and-tanks" },
            { text: "Hoodies & Sweatshirts", href: "/category/hoodies-and-sweatshirts" },
            { text: "Blazers & Suits", href: "/category/blazers-and-suits" },
            { text: "Shorts", href: "/category/shorts" },
            { text: "Outerwear", href: "/category/outerwear" },
          ],
        },
        {
          text: "Kids",
          href: "/category/kids",
          items: [
            { text: "Clothing", href: "/category/clothing" },
            { text: "Activewear", href: "/category/activewear" },
            { text: "Accessories", href: "/category/kids-accessories" },
            { text: "Footwear", href: "/category/footwear" },
          ],
        },
      ],
    },
  },
  {
    text: "Electronics",
    href: "/category/electronics",
    submenu: {
      variant: "text-grid",
      items: [
        {
          text: "Audio Devices",
          href: "/category/audio-devices",
          items: [
            { text: "Headphones", href: "/category/headphones" },
            { text: "Speakers", href: "/category/speakers" },
          ],
        },
        {
          text: "Cameras",
          href: "/category/cameras",
          items: [
            { text: "Digital Cameras", href: "/category/digital-cameras" },
            { text: "Action Cameras", href: "/category/action-cameras" },
          ],
        },
        {
          text: "Smartphones",
          href: "/category/smartphones",
        },
        {
          text: "Laptops",
          href: "/category/laptops",
        },
        {
          text: "Screens",
          href: "/category/screens",
        },
      ],
    },
  },
  {
    text: "Sports & Outdoors",
    href: "/category/sports-and-outdoors",
    submenu: {
      variant: "text-grid",
      items: [
        {
          href: "/category/exercise-equipment",
          text: "Exercise Equipment",
        },
        {
          href: "/category/outdoor-gear",
          text: "Outdoor Gear",
        },
        {
          href: "/category/sportswear",
          text: "Sportswear",
        },
        {
          href: "/category/athletic-footwear",
          text: "Athletic Footwear",
        },
      ],
    },
  },
  {
    text: "Beauty",
    href: "/category/beauty",
    submenu: {
      variant: "text-grid",
      items: [
        {
          text: "Skin Care",
          href: "/category/skin-care",
          items: [
            { text: "Cleansers", href: "/category/cleansers" },
            { text: "Moisturizers", href: "/category/moisturizers" },
            { text: "Treatments & Serums", href: "/category/treatments-and-serums" },
          ],
        },
        {
          text: "Makeup",
          href: "/category/makeup",
          items: [
            { text: "Face Makeup", href: "/category/face-makeup" },
            { text: "Eye Makeup", href: "/category/eye-makeup" },
            { text: "Lip Makeup", href: "/category/lip-makeup" },
          ],
        },
        {
          text: "Haircare",
          href: "/category/haircare",
          items: [
            { text: "Shampoos & Conditioners", href: "/category/shampoos-and-conditioners" },
            { text: "Styling Products", href: "/category/styling-products" },
          ],
        },

        {
          text: "Fragrances",
          href: "/category/fragrances",
          items: [
            { text: "Perfumes", href: "/category/perfumes" },
            { text: "Body Sprays", href: "/category/body-sprays" },
          ],
        },
      ],
    },
  },
  {
    text: "Furniture",
    href: "/category/furniture",
    submenu: {
      variant: "text-grid",
      items: [
        {
          text: "Living Room",
          href: "/category/living-room-furniture",
          items: [
            { text: "Sofas & Sectionals", href: "/category/sofas-and-sectionals" },
            { text: "Coffee Tables", href: "/category/coffee-tables" },
            { text: "TV Stands", href: "/category/tv-stands" },
          ],
        },

        {
          text: "Bedroom",
          href: "/category/bedroom-furniture",
          items: [
            { text: "Beds", href: "/category/beds" },
            { text: "Dressers", href: "/category/dressers" },
            { text: "Nightstands", href: "/category/nightstands" },
          ],
        },

        {
          text: "Office",
          href: "/category/office-furniture",
          items: [
            { text: "Desks", href: "/category/desks" },
            { text: "Office Chairs", href: "/category/office-chairs" },
            { text: "Storage Solutions", href: "/category/storage-solutions" },
          ],
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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Script id="mobileMegaMenuLogic" strategy="lazyOnload">{`${mobileInlineScript}`}</Script>

        <NavigationBar items={navigationItems} />

        {children}

        <Footer />
        <Modals />

        <CartView />

        <Toaster position="bottom-left" />

        <DraftToolbar />

        <Suspense>
          <FlagValues />
        </Suspense>

        <ThirdParties />

        <GithubBadge />
        <DemoModeAlert />
      </body>
    </html>
  )
}
