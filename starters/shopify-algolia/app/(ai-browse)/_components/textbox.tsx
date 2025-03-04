import { useRef } from "react"
import { motion } from "motion/react"
import { toast } from "sonner"
import { cn } from "utils/cn"
import { Textarea } from "components/ui/textarea"
import { useAiCommerce } from "./ai-commerce-provider"
import { generateUUID } from "utils/generate-uuid"

export const Textbox = ({ messages }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { handleSubmit, createNewSuggestions, setInput, isLoading, input } = useAiCommerce()

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value)
  }

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(e)
    createNewSuggestions([...messages, { id: generateUUID(), role: "user", content: input }])
  }
  return (
    <form>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25, delay: 0.18 }}>
        <Textarea
          ref={textareaRef}
          placeholder="Send a message..."
          value={input}
          onChange={handleInput}
          className={cn("max-h-[calc(50dvh)] min-h-[24px] resize-none overflow-hidden rounded-xl bg-white text-base focus-visible:ring-gray-300")}
          rows={3}
          autoFocus
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault()

              if (isLoading) {
                toast.error("Please wait for the model to finish its response!")
              } else {
                handleSubmitForm(event as unknown as React.FormEvent<HTMLFormElement>)
              }
            }
          }}
        />
      </motion.div>
    </form>
  )
}
