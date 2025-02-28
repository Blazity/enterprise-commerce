import { PromptSuggestion, PromptSuggestions } from "components/ui/prompt-suggestions"
import { motion } from "framer-motion"
import { useMemo } from "react"
import { toast } from "sonner"
import { generateUUID } from "utils/generate-uuid"
import { useAiCommerce } from "./ai-commerce-provider"

const INIT_SUGGESTIONS = ["Show me electronics under 250$", "I'm a big Vercel fan, show me black t-shirts", "I want to buy the cheapest running shoes"]

export function Suggestions() {
  const { isLoading, append, messages, suggestionsStream, createNewSuggestions } = useAiCommerce()

  const handleClick = (suggestion: string) => {
    if (isLoading) {
      toast.error("Please wait for the model to finish its response!")
      return
    }

    createNewSuggestions([...messages, { id: generateUUID(), role: "user", content: suggestion }])
    append({ role: "user", content: suggestion })
  }

  const currentSuggestions = useMemo(() => (suggestionsStream?.length ? suggestionsStream.filter(Boolean).slice(0, 3) : INIT_SUGGESTIONS), [suggestionsStream])

  return (
    <PromptSuggestions className="my-4 min-h-[160px]">
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
