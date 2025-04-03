import "../globals.css"

import Script from "next/script"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import { Suspense } from "react"
import { Toaster } from "sonner"
import { FlagValues } from "components/flag-values"
import { ThirdParties } from "components/third-parties"
import { DemoModeAlert } from "components/demo-mode-alert"
import { CartView } from "components/cart/cart-view"
import { NavigationBar } from "components/navigation-bar/navigation-bar"
import { mobileInlineScript } from "components/navigation-bar/mobile-inline-script"
import { Footer } from "components/footer"
import { Modals } from "components/modals/modals"
import DraftToolbar from "components/draft-toolbar"
import { navigationItems } from "utils/nav-items"
import { AiCommerceProvider } from "./_components/ai-commerce-provider"
import { FloatingChatBox } from "./_components/floating-chat-box"
import { SidebarProvider } from "components/ui/sidebar"
import { ChatSidebar } from "./_components/chat-sidebar"

export default function AiSearchLayout({ children }: { children: React.ReactNode }) {
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
