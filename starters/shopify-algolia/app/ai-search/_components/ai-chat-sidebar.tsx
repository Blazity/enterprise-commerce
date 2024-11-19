"use client"

import * as React from "react"
import { ShoppingBag, Send, ShoppingCart, User, Bot } from "lucide-react"

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "components/ui/sidebar"
import { Input } from "components/ui/input"
import { Button } from "components/ui/button"
import { ScrollArea } from "components/ui/scroll-area"
import { Avatar, AvatarFallback } from "components/ui/avatar"
import { SheetHeader, SheetTitle } from "components/ui/sheet"
import { DialogTitle } from "components/ui/dialog"

interface Message {
  id: number
  content: string
  sender: "user" | "ai"
}

export function AiCommerceSidebar() {
  const [messages, setMessages] = React.useState<Message[]>([{ id: 1, content: "Welcome! How can I assist you with your shopping today?", sender: "ai" }])
  const [inputMessage, setInputMessage] = React.useState("")
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  React.useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        content: inputMessage,
        sender: "user",
      }
      setMessages([...messages, newMessage])
      setInputMessage("")
      // Here you would typically send the message to your AI backend
      // and then add the AI's response to the messages
      setTimeout(() => {
        const aiResponse: Message = {
          id: messages.length + 2,
          content: "I'm processing your request. How else can I help you?",
          sender: "ai",
        }
        setMessages((prev) => [...prev, aiResponse])
      })
    }
  }

  return (
    <Sidebar className="isolate z-50">
      <SidebarHeader className="p-4">
        <h2 className="text-lg font-semibold text-sidebar-foreground">AI Shopping Assistant</h2>
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea className="h-[calc(100vh-12rem)] px-4">
          <div className="flex flex-col space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex items-start ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                {message.sender === "ai" && (
                  <Avatar className="mr-2">
                    <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[70%] rounded-lg p-2 ${
                    message.sender === "user" ? "bg-sidebar-primary text-sidebar-primary-foreground" : "bg-sidebar-accent text-sidebar-accent-foreground"
                  }`}
                >
                  {message.content}
                </div>
                {message.sender === "user" && (
                  <Avatar className="ml-2">
                    <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Type a message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="bg-sidebar-accent text-sidebar-accent-foreground placeholder-sidebar-accent-foreground/50"
          />
          <Button size="icon" onClick={handleSendMessage} className="bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90">
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
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
