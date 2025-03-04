import { PromptSuggestion, PromptSuggestions } from "components/ui/prompt-suggestions"
import { AnimatePresence, motion } from "framer-motion"
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
    <PromptSuggestions className="my-4">
      <AnimatePresence>
        {currentSuggestions.map((suggestion, index) => {
          return (
            <motion.div
              key={`suggestion-${index}`}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{
                opacity: 0,
                y: 5,
                pointerEvents: "none",

                transition: {
                  delay: 0.02 * index,
                  ease: "easeOut",
                  pointerEvents: {
                    delay: 0,
                  },
                },
              }}
              whileTap={{ scale: 0.98, transition: { delay: 0 } }}
              transition={{ duration: 0.25, delay: 0.02 * index, ease: "easeOut" }}
            >
              <PromptSuggestion disabled={isLoading} value={suggestion} className=" bg-gray-200 text-black hover:bg-gray-300" onClick={() => handleClick(suggestion)}>
                {suggestion}
              </PromptSuggestion>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </PromptSuggestions>
  )
}
