"use client"

import * as React from "react"
import { ShoppingBag, ShoppingCart } from "lucide-react"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "components/ui/sidebar"
import { ScrollArea } from "components/ui/scroll-area"
import { Textarea } from "components/ui/textarea"
import { toast } from "sonner"
import { cn } from "utils/cn"
import { MessageList } from "components/ui/message-list"
import { useAiCommerce } from "./ai-commerce-context"
import { Suggestions } from "./chat-suggestions"

export function AiCommerceSidebar() {
  const { handleSubmit, setInput, messages, isLoading, input } = useAiCommerce()
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

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
        <form>
          <div className="flex items-center space-x-2">
            <Textarea
              ref={textareaRef}
              placeholder="Send a message..."
              value={input}
              onChange={handleInput}
              className={cn("max-h-[calc(50dvh)] min-h-[24px] resize-none overflow-hidden rounded-xl bg-muted text-base")}
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
          </div>
          <Suggestions />
        </form>
        <SidebarMenu className="mt-4">
          <SidebarMenuItem>
            <SidebarMenuButton className="w-full justify-start text-sidebar-foreground transition-all hover:scale-105 hover:bg-sidebar-accent hover:text-secondary-foreground">
              <ShoppingCart className="mr-2 h-4 w-4" />
              <span>View Cart</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton className="w-full justify-start text-sidebar-foreground transition-all hover:scale-105 hover:bg-secondary hover:text-secondary-foreground">
              <ShoppingBag className="mr-2 h-4 w-4" />
              <span>Checkout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
