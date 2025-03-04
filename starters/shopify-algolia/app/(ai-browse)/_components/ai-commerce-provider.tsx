"use client"

import type { ChatRequestOptions, CreateMessage, Message } from "ai"
import { useChat, experimental_useObject as useObject } from "ai/react"
import { createApplicationContext } from "lib/ai/utils"
import { usePathname } from "next/navigation"
import { createContext, type ReactNode, useContext, useMemo } from "react"
import { useAppContextStore } from "stores/app-context-store"
import { z } from "zod"

interface AiCommerceContextType {
  messages: Message[]
  append: (message: Message | CreateMessage, chatRequestOptions?: ChatRequestOptions) => Promise<string | null | undefined>
  input: string
  isLoading: boolean
  handleSubmit: (e?: { preventDefault: () => void }) => void
  setInput: (value: string) => void
  createNewSuggestions: (messages: Message[]) => void
  suggestionsStream: string[]
}

const AiCommerceContext = createContext<AiCommerceContextType | undefined>(undefined)

export function useAiCommerce() {
  const context = useContext(AiCommerceContext)
  if (!context) {
    throw new Error("useAiCommerce must be used within an AiCommerceProvider")
  }
  return context
}

interface AiCommerceProviderProps {
  children: ReactNode
}

export function AiCommerceProvider({ children }: AiCommerceProviderProps) {
  const pathname = usePathname()
  // // @TODO
  // // normalize search params so that only facet params are included (no tracking bs)
  // // sanitize contexts so that only relevant fields are included to decrease token usage
  // const searchParams = useSearchParams()
  const productsContext = useAppContextStore((s) => s.productsContext)
  const categoriesContext = useAppContextStore((s) => s.categoriesContext)
  const filtersContext = useAppContextStore((s) => s.filtersContext)
  //@TODO revisit once shopify's back
  // const cartContext = useCartStore((s) => s.cart)
  // console.log({ cartContext })

  const { append, messages, input, handleSubmit, setInput, isLoading } = useChat({
    api: "/api/search",
    maxSteps: 10,
    body: {
      fullApplicationContext: createApplicationContext({
        pathname,
        appContext: {
          products: productsContext,
          categories: categoriesContext,
          filters: filtersContext,
        },
        searchParams: null,
      }),
      productsContext,
      categoriesContext,
      filtersContext,
      appliedFilters: [],
    },
  })

  const { object: suggestionsStream, submit: createNewSuggestions } = useObject({
    api: "/api/suggestions",
    schema: z.array(z.string()),
  })

  const value = useMemo(
    () => ({
      messages,
      input,
      isLoading,
      handleSubmit,
      setInput,
      append,
      createNewSuggestions,
      suggestionsStream: suggestionsStream?.length ? suggestionsStream.filter(Boolean) : [],
    }),
    [messages, input, isLoading, handleSubmit, setInput, append, suggestionsStream, createNewSuggestions]
  )

  return <AiCommerceContext.Provider value={value}>{children}</AiCommerceContext.Provider>
}
