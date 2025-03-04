"use client"

import * as React from "react"
import type { ChatRequestOptions, CreateMessage, Message } from "ai"
import { useChat } from "ai/react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export type Mode = "pilot" | "concierge"

interface AiCommerceContextType {
  messages: Message[]
  append: (message: Message | CreateMessage, chatRequestOptions?: ChatRequestOptions) => Promise<string | null | undefined>
  input: string
  isLoading: boolean
  handleSubmit: (e?: { preventDefault: () => void }) => void
  setInput: (value: string) => void
  mode: Mode
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
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const paramsMode = searchParams.get("mode")
  const mode: Mode = paramsMode === "pilot" || paramsMode === "concierge" ? paramsMode : "pilot"

  const { append, messages, input, handleSubmit, setInput, isLoading } = useChat({
    api: "/api/search",
    maxSteps: 10,
    onToolCall: ({ toolCall: { toolName, args } }) => {
      if (mode === "concierge") {
        if (!pathname.startsWith("/ai/search")) {
          router.push(`/ai/search?${searchParams.toString()}`)
        }
      }

      const { segment, slug, ...rest } = args as Record<string, string | string[]>

      const params = new URLSearchParams()
      for (const [key, value] of Object.entries(rest)) {
        if (Array.isArray(value)) {
          value.forEach((v) => {
            params.set(key, v)
          })
        } else {
          params.set(key, value.toString())
        }
      }

      if (toolName === "buildNavigationQuery") {
        if (segment === "product") {
          router.push(`/ai/product/${slug}`)
        }
        if (segment === "category") {
          router.push(`/ai/${segment}/${slug}?${decodeURIComponent(params.toString())}`)
        }
        if (segment === "search") {
          router.push(`/ai/${segment}?${decodeURIComponent(params.toString())}`)
        }
      }
    },
  })

  const value = React.useMemo(
    () => ({
      messages,
      input,
      isLoading,
      handleSubmit,
      setInput,
      mode,
      append,
    }),
    [messages, input, isLoading, handleSubmit, setInput, mode]
  )

  return <AiCommerceContext.Provider value={value}>{children}</AiCommerceContext.Provider>
}
