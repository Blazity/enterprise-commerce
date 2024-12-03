"use client"

import { SidebarInset, SidebarProvider, SidebarTrigger } from "components/ui/sidebar"
import { AiCommerceSidebar } from "./_components/ai-chat-sidebar"
import { useChat } from "ai/react"
import { ToolsUI } from "./_components/tool-messages"

export default function AiSearchPage() {
  const { messages, setMessages, handleSubmit, input, setInput, isLoading } = useChat({
    api: "/api/search",
    maxSteps: 5,
  })

  return (
    <div className="flex min-h-screen">
      <SidebarProvider
        style={
          {
            "--sidebar-width": "20rem",
            "--sidebar-width-mobile": "20rem",
          } as React.CSSProperties
        }
      >
        <AiCommerceSidebar handleSubmit={handleSubmit} setInput={setInput} messages={messages} isLoading={isLoading} input={input} setMessages={setMessages} />

        <SidebarInset>
          <div className="p-4">
            <SidebarTrigger className="mb-4" />
            <h1 className="mb-4 text-2xl font-bold text-foreground">AI-Assisted Shopping</h1>
            <p className="mb-4 text-foreground/80">
              Use the chat interface on the left to interact with our AI shopping assistant. You can ask for product recommendations, compare items, or get help with your purchase.
            </p>
            <div className="grid grid-cols-1 gap-20">
              {messages.map((message) => message.toolInvocations && message.toolInvocations.length > 0 && <ToolsUI key={message.id} message={message} />)}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
