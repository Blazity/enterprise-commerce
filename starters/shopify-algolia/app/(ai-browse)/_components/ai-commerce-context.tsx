"use client"

import * as React from "react"
import type { ChatRequestOptions, CreateMessage, Message } from "ai"
import { useChat } from "ai/react"

interface AiCommerceContextType {
  messages: Message[]
  append: (message: Message | CreateMessage, chatRequestOptions?: ChatRequestOptions) => Promise<string | null | undefined>
  input: string
  isLoading: boolean
  handleSubmit: (e?: { preventDefault: () => void }) => void
  setInput: (value: string) => void
}

const AiCommerceContext = React.createContext<AiCommerceContextType | undefined>(undefined)

export function useAiCommerce() {
  const context = React.useContext(AiCommerceContext)
  if (!context) {
    throw new Error("useAiCommerce must be used within an AiCommerceProvider")
  }
  return context
}

interface AiCommerceProviderProps {
  children: React.ReactNode
}

export function AiCommerceProvider({ children }: AiCommerceProviderProps) {
  const { append, messages, input, handleSubmit, setInput, isLoading } = useChat({
    api: "/api/search",
    maxSteps: 10,
  })

  const value = React.useMemo(
    () => ({
      messages,
      input,
      isLoading,
      handleSubmit,
      setInput,
      append,
    }),
    [messages, input, isLoading, handleSubmit, setInput]
  )

  return <AiCommerceContext.Provider value={value}>{children}</AiCommerceContext.Provider>
}
