"use client"

import { ToolsUI } from "app/(ai-browse)/_components/tool-messages"
import { useAiCommerce } from "app/(ai-browse)/_components/ai-commerce-context"

export const AiSearchView = () => {
  const { messages } = useAiCommerce()

  return (
    <div className="flex-grow p-4">
      <h1 className="mb-4 text-2xl font-bold text-foreground">AI-Assisted Shopping</h1>
      <p className="mb-4 text-foreground/80">
        Use the chat interface to interact with our AI shopping assistant. You can ask for product recommendations, compare items, or get help with your purchase.
      </p>
      <div className="grid grid-cols-1 gap-20">
        {messages.map((message) => message.toolInvocations && message.toolInvocations.length > 0 && <ToolsUI key={message.id} message={message} />)}
      </div>
    </div>
  )
}
