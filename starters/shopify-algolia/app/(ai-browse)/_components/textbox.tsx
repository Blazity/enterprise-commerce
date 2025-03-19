import { FC, useCallback, useRef } from "react"
import { AnimatePresence, motion } from "motion/react"
import { toast } from "sonner"
import { cn } from "utils/cn"
import { Textarea } from "components/ui/textarea"
import { useAiCommerce } from "./ai-commerce-provider"
import { generateUUID } from "utils/generate-uuid"
import { Mic, SendHorizontal, X } from "lucide-react"
import type { Message } from "ai"
import { useSpeechRecognition } from "./use-speech-recognition"

type TextboxProps = { messages: Message[] }

export const Textbox: FC<TextboxProps> = ({ messages }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const { handleSubmit, createNewSuggestions, setInput, isLoading, input } = useAiCommerce()

  const handleInput = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInput(event.target.value)
    },
    [setInput]
  )

  const { startRecognition, stopRecognition, recordingState } = useSpeechRecognition({
    onTranscript: (text) => setInput(text),
    onEndOfUtterance: () => handleSubmitForm(),
    onError: (message) => toast.error(message),
  })

  const handleSubmitForm = useCallback(
    (e?: React.FormEvent<HTMLFormElement>) => {
      if (recordingState === "recording") {
        stopRecognition()
      }
      if (e) e.preventDefault()
      handleSubmit(e)
      createNewSuggestions([...messages, { id: generateUUID(), role: "user", content: input }])
    },
    [handleSubmit, createNewSuggestions, messages, input, recordingState, stopRecognition]
  )

  const handleDiscard = useCallback(() => {
    stopRecognition()
    setInput("")
  }, [stopRecognition, setInput])

  return (
    <form ref={formRef} onSubmit={handleSubmitForm} className="relative">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25, delay: 0.18 }}>
        <Textarea
          ref={textareaRef}
          placeholder={recordingState === "recording" ? "Recording..." : "Send a message..."}
          value={input}
          onChange={handleInput}
          disabled={recordingState === "recording"}
          className={cn(
            "max-h-[calc(50dvh)] min-h-[24px] resize-none overflow-hidden rounded-xl bg-white pb-10 text-base focus-visible:ring-gray-300",
            recordingState === "recording" && "opacity-50"
          )}
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

        <div className="absolute inset-x-2 bottom-2 flex items-center">
          <div className="ml-auto flex items-center gap-2">
            <AnimatePresence mode="wait">
              {recordingState === "recording" && (
                <motion.button
                  key="discard"
                  type="button"
                  onClick={handleDiscard}
                  className="flex size-8 items-center justify-center rounded-full bg-red-100 p-1.5 text-red-600 hover:bg-red-200"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X size={18} />
                </motion.button>
              )}
            </AnimatePresence>

            <motion.button
              type={recordingState === "recording" || input.length > 0 ? "submit" : "button"}
              onClick={recordingState === "idle" && input.length === 0 ? startRecognition : undefined}
              className="flex size-8 items-center justify-center rounded-full p-1.5 text-gray-600 hover:bg-gray-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {recordingState === "recording" || input.length > 0 ? (
                  <motion.div key="send" initial={{ opacity: 0, rotate: -45 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 45 }} transition={{ duration: 0.2 }}>
                    <SendHorizontal size={18} />
                  </motion.div>
                ) : (
                  <motion.div key="mic" initial={{ opacity: 0, rotate: -45 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 45 }} transition={{ duration: 0.2 }}>
                    <Mic size={18} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </form>
  )
}
