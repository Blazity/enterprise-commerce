"use client"

import * as React from "react"

import { ShoppingBag, ShoppingCart, ArrowUpIcon } from "lucide-react"

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "components/ui/sidebar"
import { Button } from "components/ui/button"
import { ScrollArea } from "components/ui/scroll-area"
import { Textarea } from "components/ui/textarea"
import { toast } from "sonner"
import { cn } from "utils/cn"
import { StopIcon } from "components/icons/stop-icon"
import { sanitizeUIMessages } from "lib/ai/chat"
import { MessageList } from "components/ui/message-list"

export function AiCommerceSidebar({ handleSubmit, setInput, messages, isLoading, input, setMessages }) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  const handleSubmitForm = () => {
    handleSubmit()
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
      <SidebarHeader className="p-4">
        <h2 className="text-lg font-semibold text-sidebar-foreground">AI Shopping Assistant</h2>
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea className="h-[calc(100vh-12rem)] px-4">
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
        <div className="flex items-center space-x-2">
          <Textarea
            ref={textareaRef}
            placeholder="Send a message..."
            value={input}
            onChange={handleInput}
            className={cn("max-h-[calc(75dvh)] min-h-[24px] resize-none overflow-hidden rounded-xl bg-muted text-base")}
            rows={3}
            autoFocus
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault()

                if (isLoading) {
                  toast.error("Please wait for the model to finish its response!")
                } else {
                  handleSubmitForm()
                }
              }
            }}
          />
        </div>
        <div className="z-50">
          {isLoading ? (
            <Button
              className="absolute bottom-2 right-2 m-0.5 h-fit rounded-full border p-1.5 dark:border-zinc-600"
              onClick={(event) => {
                event.preventDefault()
                stop()
                setMessages((messages) => sanitizeUIMessages(messages))
              }}
            >
              <StopIcon size={20} />
            </Button>
          ) : (
            <Button
              className="absolute bottom-2 right-2 m-0.5 h-fit rounded-full border p-1.5 dark:border-zinc-600"
              onClick={(event) => {
                event.preventDefault()
                handleSubmitForm()
              }}
              disabled={input.length === 0}
            >
              <ArrowUpIcon size={14} />
            </Button>
          )}
        </div>
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
