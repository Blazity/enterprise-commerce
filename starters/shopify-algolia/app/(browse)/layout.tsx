import "../globals.css"

import Script from "next/script"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import { Suspense } from "react"
import { Toaster } from "sonner"
import { FlagValues } from "components/flag-values"
import { ThirdParties } from "components/third-parties"
import { env } from "env.mjs"
import { Metadata } from "next"
import { GithubBadge } from "components/github-badge"
import { DemoModeAlert } from "components/demo-mode-alert"
import { CartView } from "components/cart/cart-view"
import { NavigationBar } from "components/navigation-bar/navigation-bar"
import { mobileInlineScript } from "components/navigation-bar/mobile-inline-script"
import { Footer } from "components/footer"
import { Modals } from "components/modals/modals"
import DraftToolbar from "components/draft-toolbar"
import { navigationItems } from "utils/nav-items"

export const revalidate = 86400

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
      <body className="@container">
        <NuqsAdapter>
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
        </NuqsAdapter>
      </body>
    </html>
  )
}
