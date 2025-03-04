import "../globals.css"

import Script from "next/script"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import { Suspense } from "react"
import { Toaster } from "sonner"
import { FlagValues } from "components/flag-values"
import { ThirdParties } from "components/third-parties"
import { GithubBadge } from "components/github-badge"
import { DemoModeAlert } from "components/demo-mode-alert"
import { CartView } from "components/cart/cart-view"
import { NavigationBar } from "components/navigation-bar/navigation-bar"
import { mobileInlineScript } from "components/navigation-bar/mobile-inline-script"
import { Footer } from "components/footer"
import { Modals } from "components/modals/modals"
import DraftToolbar from "components/draft-toolbar"
import { SidebarInset, SidebarProvider } from "components/ui/sidebar"
import { AiCommerceSidebar } from "./_components/ai-chat"
import { navigationItems } from "utils/nav-items"
import { AiCommerceProvider } from "./_components/ai-commerce-provider"

export default function AiSearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <NuqsAdapter>
          <Script id="mobileMegaMenuLogic" strategy="lazyOnload">
            {`${mobileInlineScript}`}
          </Script>

          <AiCommerceProvider>
            <SidebarProvider
              style={
                {
                  "--sidebar-width": "20rem",
                  "--sidebar-width-mobile": "20rem",
                } as React.CSSProperties
              }
            >
              <Suspense fallback={null}>
                <AiCommerceSidebar />
              </Suspense>
              <SidebarInset>
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
              </SidebarInset>
            </SidebarProvider>
          </AiCommerceProvider>
        </NuqsAdapter>
      </body>
    </html>
  )
}
