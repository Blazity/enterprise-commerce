import "../globals.css"

import Script from "next/script"
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
import { AiCommerceProvider } from "./_components/ai-commerce-context"
import SidebarButton from "./_components/sidebar-button"

export default function AiSearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Script id="mobileMegaMenuLogic" strategy="lazyOnload">
          {`${mobileInlineScript}`}
        </Script>

        <Suspense>
          <AiCommerceProvider>
            <SidebarProvider
              style={
                {
                  "--sidebar-width": "20rem",
                  "--sidebar-width-mobile": "20rem",
                } as React.CSSProperties
              }
            >
              <Suspense>
                <AiCommerceSidebar />
              </Suspense>
              <SidebarInset className="w-[calc(100vw-var(--sidebar-width))] max-w-full">
                <NavigationBar items={navigationItems} />
                {children}

                <Footer />
                <Modals />

                <CartView />

                <Toaster position="bottom-left" />

                <DraftToolbar />

                <SidebarButton />

                <Suspense>
                  <FlagValues />
                </Suspense>

                <ThirdParties />

                <GithubBadge />
                <DemoModeAlert />
              </SidebarInset>
            </SidebarProvider>
          </AiCommerceProvider>
        </Suspense>
      </body>
    </html>
  )
}
