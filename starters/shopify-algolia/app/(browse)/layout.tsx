import "../globals.css"

import Script from "next/script"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import { Suspense } from "react"
import { Toaster } from "sonner"
import { FlagValues } from "components/flag-values"
import { ThirdParties } from "components/third-parties"
import { Metadata } from "next"
import { sharedMetadata } from "../shared-metadata"
import { GithubBadge } from "components/github-badge"
import { DemoModeAlert } from "components/demo-mode-alert"
import { CartView } from "components/cart/cart-view"
import { NavigationBarWrapper } from "components/navigation-bar/navigation-bar-wrapper"
import { mobileInlineScript } from "components/navigation-bar/mobile-inline-script"
import { Footer } from "components/footer"
import { Modals } from "components/modals/modals"
import DraftToolbar from "components/draft-toolbar"
import { getNavigationData } from "lib/navigation"

export const revalidate = 86400

export const metadata: Metadata = {
  metadataBase: sharedMetadata.metadataBase,
  title: "Next.js Enterprise Commerce | Blazity",
  description: sharedMetadata.openGraph.description,
  openGraph: sharedMetadata.openGraph,
  twitter: sharedMetadata.twitter,
  verification: {
    google: "google",
    yandex: "yandex",
    yahoo: "yahoo",
  },
  generator: "Next.js",
  applicationName: "Next.js",
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const navigationData = await getNavigationData()

  return (
    <html lang="en">
      <body className="@container">
        <NuqsAdapter>
          <Script id="mobileMegaMenuLogic" strategy="lazyOnload">{`${mobileInlineScript}`}</Script>

          <NavigationBarWrapper fallbackData={navigationData} />
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
