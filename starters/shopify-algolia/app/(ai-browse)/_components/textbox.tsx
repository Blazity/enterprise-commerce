"use client"

import { FC, useCallback } from "react"
import { motion } from "motion/react"
import { toast } from "sonner"
import { useAiCommerce } from "./ai-commerce-provider"
import { generateUUID } from "utils/generate-uuid"
import type { Message } from "ai"
import { ChatInput } from "./chat-input"
type TextboxProps = { messages: Message[] }

export const Textbox: FC<TextboxProps> = ({ messages }) => {
  const { handleSubmit, createNewSuggestions, setInput, isLoading, input, append } = useAiCommerce()

  const handleChatSubmit = useCallback(
    (e?: React.FormEvent<HTMLFormElement>) => {
      if (e) e.preventDefault()
      if (isLoading) {
        toast.error("Please wait for the model to finish its response!")
        return
      }
      handleSubmit(e)
      createNewSuggestions([...messages, { id: generateUUID(), role: "user", content: input }])
    },
    [handleSubmit, createNewSuggestions, messages, input, isLoading]
  )

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25, delay: 0.18 }}>
      <ChatInput input={input} setInput={setInput} handleSubmit={handleChatSubmit} isTyping={isLoading} append={append} />
    </motion.div>
  )
}
