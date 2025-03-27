"use client"

import { MessageList } from "components/ui/message-list"
import { motion } from "motion/react"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "components/ui/sidebar"
import { ShoppingBag, ShoppingCart, Zap } from "lucide-react"
import * as React from "react"
import { useAiCommerce } from "./ai-commerce-provider"
import { Textbox } from "./textbox"
import { useCartStore } from "stores/cart-store"
import { useRouter } from "next/navigation"

export function ChatSidebar() {
  const router = useRouter()
  const { messages, isLoading } = useAiCommerce()
  const cart = useCartStore((state) => state.cart)
  const openCart = useCartStore((state) => state.openCart)
  const preloadSheet = useCartStore((state) => state.preloadSheet)

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex w-full flex-col whitespace-nowrap">
          <div className="flex items-center gap-2 self-center">
            <Zap className="size-5" />
            <span className="font-semibold tracking-tight">Commerce Assistant</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="py-4 pl-4 pr-1">
        <MessageList
          messages={messages}
          showTimeStamps={false}
          isTyping={isLoading && messages[messages.length - 1].role === "user" && messages.length > 0}
          messageOptions={{ animation: "scale", showTimeStamp: true, showToolMessages: false }}
        />
      </SidebarContent>
      <SidebarFooter className="p-4">
        <Textbox messages={messages} />
        <SidebarMenu className="mt-4">
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="w-full cursor-pointer select-none justify-start bg-gray-100 font-medium text-sidebar-foreground transition-all duration-200 hover:bg-gray-200 hover:text-secondary-foreground active:scale-[0.98] active:bg-gray-200"
              onClick={() => openCart()}
              onMouseEnter={preloadSheet}
              onTouchStart={preloadSheet}
            >
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25, delay: 0.22 }}>
                <ShoppingCart className="mr-1 size-4" />
                <span>View Cart</span>
              </motion.div>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="w-full cursor-pointer select-none justify-start bg-gray-100 font-medium text-sidebar-foreground transition-all duration-200 hover:bg-gray-200 hover:text-secondary-foreground active:scale-[0.98] active:bg-gray-200"
            >
              {!!cart?.checkoutUrl && (
                <motion.button onClick={() => router.push(cart.checkoutUrl)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25, delay: 0.25 }}>
                  <ShoppingBag className="mr-1 size-4" />
                  <span>Checkout</span>
                </motion.button>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
