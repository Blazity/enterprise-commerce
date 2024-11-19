import { SidebarInset, SidebarProvider, SidebarTrigger } from "components/ui/sidebar"
import React from "react"
import { AiCommerceSidebar } from "./_components/ai-chat-sidebar"

export default function Layout({ children }) {
  return (
    <>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "20rem",
            "--sidebar-width-mobile": "20rem",
          } as React.CSSProperties
        }
      >
        <AiCommerceSidebar />
        <SidebarInset>
          <main>{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}
