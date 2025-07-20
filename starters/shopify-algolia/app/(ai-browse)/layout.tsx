import "../globals.css"

import Script from "next/script"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import { Suspense } from "react"
import { Toaster } from "sonner"
import { FlagValues } from "components/flag-values"
import { ThirdParties } from "components/third-parties"
import { Metadata } from "next"
import { DemoModeAlert } from "components/demo-mode-alert"
import { CartView } from "components/cart/cart-view"
import { NavigationBarWrapper } from "components/navigation-bar/navigation-bar-wrapper"
import { mobileInlineScript } from "components/navigation-bar/mobile-inline-script"
import { Footer } from "components/footer"
import { Modals } from "components/modals/modals"
import DraftToolbar from "components/draft-toolbar"
import { getNavigationData } from "lib/navigation"
import { AiCommerceProvider } from "./_components/ai-commerce-provider"
import { FloatingChatBox } from "./_components/floating-chat-box"
import { SidebarProvider } from "components/ui/sidebar"
import { ChatSidebar } from "./_components/chat-sidebar"

export const revalidate = 86400

export const metadata: Metadata = {
  // Inherits metadataBase from root layout
}

export default async function AiSearchLayout({ children }: { children: React.ReactNode }) {
  const navigationData = await getNavigationData()
  
  return (
    <html lang="en">
      <body>
        <Script id="mobileMegaMenuLogic" strategy="lazyOnload">
          {`${mobileInlineScript}`}
        </Script>
        <NuqsAdapter>
          <AiCommerceProvider>
            <SidebarProvider
              style={
                {
                  "--sidebar-width": "20rem",
                  "--sidebar-width-mobile": "20rem",
                } as React.CSSProperties
              }
            >
              <ChatSidebar />
              <div className="w-full @container md:flex-1">
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
                <DemoModeAlert />
              </div>
              <FloatingChatBox />
            </SidebarProvider>{" "}
          </AiCommerceProvider>
        </NuqsAdapter>
      </body>
    </html>
  )
}
