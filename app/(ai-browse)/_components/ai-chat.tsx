"use client"

import * as React from "react"
import { ShoppingBag, ShoppingCart, Zap } from "lucide-react"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "components/ui/sidebar"
import { ScrollArea } from "components/ui/scroll-area"
import { Textarea } from "components/ui/textarea"
import { toast } from "sonner"
import { cn } from "utils/cn"
import { MessageList } from "components/ui/message-list"
import { useAiCommerce } from "./ai-commerce-context"
import { Suggestions } from "./chat-suggestions"
import { motion } from "motion/react"
import { useCartStore } from "stores/cart-store"

export function AiCommerceSidebar() {
  const { handleSubmit, setInput, messages, isLoading, input, mode } = useAiCommerce()
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)
  const { openCart, preloadSheet } = useCartStore((s) => s)

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(e)
  }

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value)
  }

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight + 2}px`
    }
  }

  React.useEffect(() => {
    if (textareaRef.current) {
      adjustHeight()
    }
  }, [])

  React.useEffect(() => {
    if (textareaRef.current) {
      const domValue = textareaRef.current.value
      const finalValue = domValue || ""
      setInput(finalValue)
      adjustHeight()
    }
    // Only run once after hydration
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Sidebar variant="inset">
      <SidebarHeader className="rounded-t-xl px-4 py-[29px] text-sidebar-foreground">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex w-full flex-col whitespace-nowrap">
              <div className="flex items-center gap-2 self-center">
                <Zap className="size-5" />
                <span className={cn("font-semibold tracking-tight")}>AI-Commerce Chatbot</span>
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea className="relative h-full rounded-xl border-black/10 px-4 py-2">
          <div className="ai-chat-fade-out-mask pointer-events-none absolute inset-0 z-10"></div>
          <div className="flex flex-col space-y-4">
            <MessageList
              messages={messages.filter((message) => !!message.content)}
              showTimeStamps={false}
              isTyping={isLoading && messages[messages.length - 1].role === "user" && messages.length > 0}
              messageOptions={{ animation: "scale", showTimeStamp: true, showToolMessages: false }}
            />
          </div>
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <Suggestions />
        <form>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25, delay: 0.18 }}>
            <Textarea
              ref={textareaRef}
              placeholder="Send a message..."
              value={input}
              onChange={handleInput}
              className={cn("max-h-[calc(50dvh)] min-h-[24px] resize-none overflow-hidden rounded-xl bg-white text-base focus-visible:ring-gray-300")}
              rows={3}
              autoFocus
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault()

                  if (isLoading) {
                    toast.error("Please wait for the model to finish its response!")
                  } else {
                    handleSubmitForm(event as unknown as React.FormEvent<HTMLFormElement>)
                  }
                }
              }}
            />
          </motion.div>
        </form>
        <SidebarMenu className="mt-4">
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="duration-[200ms] w-full cursor-pointer select-none justify-start bg-gray-100 font-medium text-sidebar-foreground transition-all hover:bg-gray-200 hover:text-secondary-foreground active:scale-[0.98] active:bg-gray-200"
              onClick={() => openCart()}
              onMouseOver={preloadSheet}
            >
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25, delay: 0.22 }}>
                <ShoppingCart className="mr-1 h-4 w-4" />
                <span>View Cart</span>
              </motion.div>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="duration-[200ms] w-full cursor-pointer select-none justify-start bg-gray-100 font-medium text-sidebar-foreground transition-all hover:bg-gray-200 hover:text-secondary-foreground active:scale-[0.98] active:bg-gray-200"
            >
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25, delay: 0.25 }}>
                <ShoppingBag className="mr-1 h-4 w-4" />
                <span>Checkout</span>
              </motion.div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
