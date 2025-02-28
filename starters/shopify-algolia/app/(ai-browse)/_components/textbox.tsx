import { useRef } from "react"
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
      <div className="flex items-center space-x-2">
        <Textarea
          ref={textareaRef}
          placeholder="Send a message..."
          value={input}
          onChange={handleInput}
          className={cn("max-h-[calc(50dvh)] min-h-[24px] resize-none overflow-hidden rounded-xl bg-muted text-base")}
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
      </div>
    </form>
  )
}
