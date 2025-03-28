"use client"

import { FC, useCallback, useEffect, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "utils/cn"
import { Textarea } from "components/ui/textarea"
import { Loader2, Mic, SendHorizontal, X } from "lucide-react"
import { env } from "env.mjs"
import { AudioVisualizer } from "components/ui/audio-visualizer"
import { useSpeechRecognition } from "./use-speech-recognition"
import { AiCommerceContextType } from "./ai-commerce-provider"

interface ChatInputProps {
  input: string
  setInput: (value: string) => void
  handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => void
  isTyping: boolean
  append: AiCommerceContextType["append"]
}

export const ChatInput: FC<ChatInputProps> = ({ input, setInput, handleSubmit, isTyping, append }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const isSpeechEnabled = env.NEXT_PUBLIC_AZURE_AI_SPEECH_ENABLED === "true"
  const isInputEmpty = !input || input.trim() === ""

  const { startRecognition, stopRecognition, recordingState, stream } = useSpeechRecognition({
    onFinalTranscript: (text: string) => {
      append({ role: "user", content: text })
    },
    onError: (message: string) => console.error(message),
  })

  const BASE_HEIGHT_PX = 32
  const LINE_HEIGHT_PX = 20

  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current
    if (textarea) {
      const lines = Math.max(1, Math.ceil((textarea.scrollHeight - 12) / LINE_HEIGHT_PX))
      const newHeight = Math.min(BASE_HEIGHT_PX + (lines - 1) * LINE_HEIGHT_PX, 100)
      textarea.style.height = `${newHeight}px`
    }
  }, [])

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (recordingState !== "recording") {
        setInput(e.target.value)
        adjustHeight()
      }
    },
    [setInput, adjustHeight, recordingState]
  )

  const handleSubmitForm = useCallback(
    (e?: React.FormEvent<HTMLFormElement>) => {
      if (e) e.preventDefault()
      if (isInputEmpty) return
      handleSubmit(e)
      setInput("")
      if (textareaRef.current) textareaRef.current.style.height = `${BASE_HEIGHT_PX}px`
    },
    [handleSubmit, isInputEmpty, setInput]
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        handleSubmitForm()
      }
    },
    [handleSubmitForm]
  )

  const handleDiscard = useCallback(() => {
    if (isSpeechEnabled) stopRecognition()
    setInput("")
    if (textareaRef.current) textareaRef.current.style.height = `${BASE_HEIGHT_PX}px`
  }, [stopRecognition, setInput, isSpeechEnabled])

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = `${BASE_HEIGHT_PX}px`
      if (input && recordingState !== "recording") {
        adjustHeight()
      }
    }
  }, [input, adjustHeight, recordingState])

  const handleActionButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (recordingState === "processing") return
    if (isSpeechEnabled && recordingState === "idle" && isInputEmpty) {
      startRecognition(e)
      return
    }
    if (isSpeechEnabled && recordingState === "idle" && !isInputEmpty) {
      return
    }
    stopRecognition(true)
  }
  const isChatInteractionDisabled = (!isSpeechEnabled && isInputEmpty) || recordingState === "processing" || isTyping
  return (
    <form ref={formRef} onSubmit={handleSubmitForm}>
      <div className="flex items-end gap-2">
        <div className="relative w-full">
          <AnimatePresence mode="wait">
            {isSpeechEnabled && recordingState === "recording" ? (
              <motion.div
                key="visualizer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={cn("w-full resize-none rounded-md border border-gray-300 bg-gray-100", "flex items-center justify-center overflow-hidden opacity-50")}
                style={{
                  height: textareaRef.current?.style.height || `${BASE_HEIGHT_PX}px`,
                  padding: "4px 8px",
                  transition: "height 0.2s ease-out",
                }}
              >
                <AudioVisualizer stream={stream} isRecording={recordingState === "recording"} onClick={handleDiscard} />
              </motion.div>
            ) : isSpeechEnabled && recordingState === "processing" ? (
              <motion.div
                key="spinner"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={cn("w-full resize-none rounded-md border border-gray-300 bg-gray-100", "flex items-center justify-center overflow-hidden opacity-50")}
                style={{
                  height: textareaRef.current?.style.height || `${BASE_HEIGHT_PX}px`,
                  padding: "4px 8px",
                  transition: "height 0.2s ease-out",
                }}
              >
                <Loader2 className="mr-2 size-4 animate-spin" />
                <span className="text-sm text-gray-700">Transcribing...</span>
              </motion.div>
            ) : (
              <motion.div key="textarea" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                <Textarea
                  ref={textareaRef}
                  placeholder="Send a message..."
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  disabled={isSpeechEnabled && recordingState !== "idle"}
                  className={cn(
                    "w-full resize-none rounded-md bg-gray-100 px-2 py-1 text-sm scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-200 focus-visible:ring-gray-300",
                    "max-h-[100px] min-h-[32px] overflow-y-auto text-base"
                  )}
                  style={{
                    height: BASE_HEIGHT_PX,
                    lineHeight: `${LINE_HEIGHT_PX}px`,
                    paddingTop: "4px",
                    paddingBottom: "4px",
                    transition: "height 0.2s ease-out",
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="relative flex items-center">
          <motion.button
            type={recordingState !== "idle" ? "button" : "submit"}
            onClick={handleActionButtonClick}
            disabled={isChatInteractionDisabled}
            className={cn(
              "z-10 flex size-8 items-center justify-center rounded-full bg-gray-200 p-1.5 text-gray-700 hover:bg-gray-300",
              "disabled:cursor-not-allowed disabled:opacity-50"
            )}
            whileHover={{ scale: recordingState === "processing" ? 1 : 1.05 }}
            whileTap={{ scale: recordingState === "processing" ? 1 : 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isSpeechEnabled && recordingState === "idle" && input.length === 0 ? (
                <motion.div key="mic" initial={{ opacity: 0, rotate: -45 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 45 }} transition={{ duration: 0.2 }}>
                  <Mic size={18} />
                </motion.div>
              ) : (
                <motion.div key="send" initial={{ opacity: 0, rotate: -45 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 45 }} transition={{ duration: 0.2 }}>
                  <SendHorizontal size={18} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
          <AnimatePresence>
            {isSpeechEnabled && recordingState === "recording" && (
              <motion.button
                type="button"
                onClick={handleDiscard}
                className="absolute flex size-8 items-center justify-center rounded-full bg-red-100 p-1.5 text-red-600 hover:bg-red-200"
                initial={{ y: 0, opacity: 0, zIndex: -1 }}
                animate={{ y: -40, opacity: 1, zIndex: 20 }}
                exit={{ y: 0, opacity: 0, zIndex: -1 }}
                transition={{ duration: 0.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X size={18} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </form>
  )
}
