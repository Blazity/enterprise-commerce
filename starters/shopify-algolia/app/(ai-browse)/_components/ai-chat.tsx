"use client"

import { MessageList } from "components/ui/message-list"
import { ScrollArea } from "components/ui/scroll-area"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "components/ui/sidebar"
import { ShoppingBag, ShoppingCart } from "lucide-react"
import * as React from "react"
import { useAiCommerce } from "./ai-commerce-provider"
import { Suggestions } from "./chat-suggestions"
import { Textbox } from "./textbox"

export function AiCommerceSidebar() {
  const { messages, isLoading } = useAiCommerce()

  return (
    <Sidebar variant="inset">
      <SidebarHeader className="border-b border-border px-4 py-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex w-full items-center justify-center">
              <span className="font-semibold">AI-Commerce</span>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea className="px-4">
          <div className="flex flex-col space-y-4">
            <MessageList
              messages={messages}
              showTimeStamps={false}
              isTyping={isLoading && messages[messages.length - 1].role === "user" && messages.length > 0}
              messageOptions={{ animation: "scale", showTimeStamp: true }}
            />
          </div>
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <Textbox messages={messages} />
        <Suggestions />
        <SidebarMenu className="mt-4">
          <SidebarMenuItem>
            <SidebarMenuButton className="w-full justify-start text-sidebar-foreground transition-all hover:scale-105 hover:bg-sidebar-accent hover:text-secondary-foreground">
              <ShoppingCart className="mr-2 size-4" />
              <span>View Cart</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton className="w-full justify-start text-sidebar-foreground transition-all hover:scale-105 hover:bg-secondary hover:text-secondary-foreground">
              <ShoppingBag className="mr-2 size-4" />
              <span>Checkout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
