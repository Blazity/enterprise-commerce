import "./globals.css"

import { Analytics } from "@vercel/analytics/next"
import { FlagValues } from "@vercel/flags/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { AnnouncementBar } from "components/AnnouncementBar/AnnouncementBar"
import { CallToAction } from "components/CallToAction/CallToAction"
import { Footer } from "components/Footer/Footer"
import { Modals } from "components/Modals/Modals"
import { mobileInlineScript } from "components/NavigationBar/mobileInlineScript"
import { NavigationBar } from "components/NavigationBar/NavigationBar"
import { NavItem } from "components/NavigationBar/types"
import { TopBar } from "components/TopBar/TopBar"
import Script from "next/script"
import { Suspense } from "react"
import { Toaster } from "sonner"
import { Cart } from "views/Cart/Cart"
import { DraftToolbar } from "views/DraftToolbar"
import { NavigationEvents } from "views/NavigationEvents"

export const revalidate = 3600

const navigationItems: NavItem[] = [
  {
    text: "Home",
    href: "/",
  },
  {
    text: "Kitchen",
    submenu: {
      variant: "text-grid",
      items: [
        {
          text: "Women",
          items: [
            { text: "Shirts & Blouses", href: "/search" },
            { text: "Pants", href: "/sport" },
            { text: "Blazers & Vests", href: "#" },
            { text: "Cardigans & Sweaters", href: "#" },
          ],
        },
        {
          text: "Men",
          items: [
            { text: "T-shirts & Tanks", href: "#" },
            { text: "Pants", href: "#" },
            { text: "Hoodies & Sweatshirts", href: "#" },
            { text: "Blazers & Suits", href: "#" },
          ],
        },
        {
          text: "Kids",
          items: [
            { text: "Clothing", href: "#" },
            { text: "Outerwear", href: "#" },
            { text: "Activewear", href: "#" },
            { text: "Accessories", href: "#" },
          ],
        },
        {
          text: "Sport",
          items: [
            { text: "Clothing", href: "#" },
            { text: "Swimwear", href: "#" },
            { text: "Outerwear", href: "#" },
            { text: "Accessories & Equipment", href: "#" },
          ],
        },
      ],
    },
  },
  {
    text: "Fashion",
    submenu: {
      variant: "image-grid",
      items: [
        {
          href: "#",
          image:
            "https://plus.unsplash.com/premium_photo-1677013011737-ba61149ba70c?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          text: "Home",
        },
        {
          href: "#",
          image:
            "https://images.unsplash.com/photo-1515688594390-b649af70d282?q=80&w=1612&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          text: "Beauty",
        },
        {
          href: "#",
          image:
            "https://plus.unsplash.com/premium_photo-1676550886096-bfc64aae1e2a?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          text: "Holiday",
        },
        {
          href: "#",
          image:
            "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          text: "Sale",
        },
        {
          href: "#",
          image:
            "https://images.unsplash.com/photo-1515688594390-b649af70d282?q=80&w=1612&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          text: "Lorem",
        },
      ],
    },
  },
  {
    text: "Electronics",
    href: "#",
  },
  {
    text: "Beauty",
    submenu: {
      variant: "text-image-grid",
      items: [
        { text: "Women", href: "#" },
        { text: "Men", href: "#" },
        { text: "Kids", href: "#" },
        { text: "Sport", href: "#" },
        { text: "T-shirts & Tanks", href: "#" },
        { text: "Pants", href: "#" },
        { text: "Hoodies & Sweatshirts", href: "#" },
        { text: "Blazers & Suits", href: "#" },
        {
          href: "#",
          image: "https://picsum.photos/seed/home/160/200",
          text: "Home",
        },
        {
          href: "#",
          image: "https://picsum.photos/seed/beauty/160/200",
          text: "Beauty",
        },
        {
          href: "#",
          image: "https://picsum.photos/seed/holiday/160/200",
          text: "Holiday",
        },
      ],
    },
  },
  {
    text: "Kids",
    href: "#",
  },
]

export const metadata = {
  title: "Demo Store | Blazity",
  description: "An intuitive navigation to captivate your audience and drive conversions effortlessly. Start boosting your sales.",
  twitter: {
    card: "summary_large_image",
    title: "Demo Store | Blazity",
    description: "An intuitive navigation to captivate your audience and drive conversions effortlessly. Start boosting your sales.",
    creator: "@blazity",
    images: ["/opengraph-image.png"],
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
        <AnnouncementBar />
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

        <Suspense fallback={null}>
          <DraftToolbar />
        </Suspense>

        <Suspense fallback={null}>
          <Analytics />
        </Suspense>

        <Toaster position="bottom-left" />
        <SpeedInsights />
        <FlagValues values={{ fasterCheckoutPage: true, landingPageRedesign: true }} />
      </body>
    </html>
  )
}
