import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useChat } from "ai/react"
import { toast } from "sonner"
import { useAiCommerce } from "./ai-commerce-context"
import { PromptSuggestion, PromptSuggestions } from "components/ui/prompt-suggestions"

const INIT_SUGGESTIONS = ["Show me electronics under 250$", "Show me best-selling lips", "What are current products on sale?", "I'm looking for sportswear"]

export function Suggestions() {
  const { isLoading, append, messages } = useAiCommerce()
  const [currentSuggestions, setCurrentSuggestions] = useState<string[]>(INIT_SUGGESTIONS)
  const { data: streamingData, append: appendSuggestions } = useChat({
    api: "/api/suggestions",
  })

  useEffect(() => {
    if (!streamingData) return

    const newSuggestions = streamingData.filter((message: any) => message.type === "suggestion" && message.content.content).map((message: any) => message.content.content)

    if (newSuggestions.length > 0) {
      // Start from an empty array and take up to 5 new suggestions
      setCurrentSuggestions(newSuggestions.slice(newSuggestions.length - 5))
    }
  }, [streamingData])

  const handleClick = (suggestion: string) => {
    if (isLoading) {
      toast.error("Please wait for the model to finish its response!")
      return
    }

    append({ role: "user", content: suggestion })
    appendSuggestions({
      role: "user",
      content: messages
        .filter((message) => message.role === "user")
        .map((message) => message.content)
        .join(""),
    })
    // Clear current suggestions after clicking
    setCurrentSuggestions([])
  }

  return (
    <PromptSuggestions className="my-4">
      {currentSuggestions.map((suggestion, index) => (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ delay: 0.1 * index }} key={`suggestion-${index}`}>
          <PromptSuggestion disabled={isLoading} value={suggestion} onClick={() => handleClick(suggestion)}>
            {suggestion}
          </PromptSuggestion>
        </motion.div>
      ))}
    </PromptSuggestions>
  )
}
