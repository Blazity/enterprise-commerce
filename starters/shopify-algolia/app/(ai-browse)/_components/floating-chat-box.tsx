"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Mic, Minus, SendHorizontal, X, Zap } from "lucide-react"
import { cn } from "utils/cn"
import { Textarea } from "components/ui/textarea"
import { MessageList } from "components/ui/message-list"
import { useAiCommerce } from "./ai-commerce-provider"
import { useSpeechRecognition } from "./use-speech-recognition"
import { env } from "env.mjs"
import type { Message } from "ai"

const ChatMessages = ({ messages, isLoading }: { messages: Message[]; isLoading: boolean }) => {
  return (
    <div className="flex-1 overflow-y-auto p-2">
      <MessageList
        messages={messages}
        showTimeStamps={false}
        isTyping={isLoading && messages.length > 0 && messages[messages.length - 1].role === "user"}
        messageOptions={{ animation: "slide", showTimeStamp: true, showToolMessages: false }}
      />
    </div>
  )
}

const ChatInput = ({ input, setInput, handleSubmit }: { input: string; setInput: (value: string) => void; handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => void }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const isSpeechEnabled = env.NEXT_PUBLIC_AZURE_AI_SPEECH_ENABLED === "true"
  const isInputEmpty = !input || input.trim() === ""

  const { startRecognition, stopRecognition, recordingState } = useSpeechRecognition({
    onTranscript: (text: string) => setInput(text),
    onEndOfUtterance: () => handleSubmitForm(),
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

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInput(e.target.value)
      adjustHeight()
    },
    [setInput, adjustHeight]
  )

  const handleSubmitForm = useCallback(
    (e?: React.FormEvent<HTMLFormElement>) => {
      if (e) e.preventDefault()
      if (isSpeechEnabled && recordingState === "recording") stopRecognition()
      if (isInputEmpty) return
      handleSubmit(e)
      setInput("")
      if (textareaRef.current) {
        textareaRef.current.style.height = `${BASE_HEIGHT_PX}px`
      }
    },
    [handleSubmit, recordingState, stopRecognition, isSpeechEnabled, isInputEmpty, setInput]
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
    if (textareaRef.current) {
      textareaRef.current.style.height = `${BASE_HEIGHT_PX}px`
    }
  }, [stopRecognition, setInput, isSpeechEnabled])

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = `${BASE_HEIGHT_PX}px`
      if (!isInputEmpty) {
        adjustHeight()
      }
    }
  }, [input, isInputEmpty, adjustHeight])

  return (
    <form ref={formRef} onSubmit={handleSubmitForm} className="p-2">
      <div className="flex items-end gap-2">
        <Textarea
          ref={textareaRef}
          placeholder={isSpeechEnabled && recordingState === "recording" ? "Recording..." : "Send a message..."}
          value={input}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          disabled={isSpeechEnabled && recordingState === "recording"}
          className={cn(
            "w-full resize-none rounded-md bg-gray-100 px-2 py-1 text-sm focus-visible:ring-gray-300",
            "max-h-[100px] min-h-[32px] overflow-y-auto",
            isSpeechEnabled && recordingState === "recording" && "opacity-50"
          )}
          style={{
            height: BASE_HEIGHT_PX,
            lineHeight: `${LINE_HEIGHT_PX}px`,
            paddingTop: "4px",
            paddingBottom: "4px",
            transition: "height 0.2s ease-out",
          }}
        />
        <div className="relative flex items-center">
          <motion.button
            type="submit"
            onClick={isSpeechEnabled && recordingState === "idle" && isInputEmpty ? startRecognition : undefined}
            disabled={!isSpeechEnabled && isInputEmpty}
            className={cn(
              "z-10 flex size-8 items-center justify-center rounded-full p-1.5 text-gray-600 hover:bg-gray-200",
              !isSpeechEnabled && isInputEmpty && "cursor-not-allowed opacity-50"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isSpeechEnabled && recordingState !== "recording" && input.length === 0 ? (
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

export const FloatingChatBox = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { messages, isLoading, input, setInput, handleSubmit } = useAiCommerce()

  const chatVariants = {
    closed: {
      width: "280px",
      height: "48px",
      transition: { type: "spring", stiffness: 100, damping: 18 },
    },
    open: {
      width: "360px",
      height: "450px",
      transition: { type: "spring", bounce: 0.25 },
    },
  }

  return (
    <motion.div
      className="fixed bottom-4 right-4 overflow-hidden rounded-lg bg-white shadow-lg md:bottom-8 md:right-8"
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      variants={chatVariants}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center space-x-2">
            <Zap className="size-5" />
            <span className="text-sm font-medium text-gray-800">Commerce Assistant</span>
          </div>
          <motion.button
            layoutId="chatButton"
            key={isOpen ? "open" : "closed"}
            className={cn(isOpen ? "bg-transparent text-gray-600 hover:text-gray-800" : "rounded-md bg-black px-4 py-1 text-white transition-colors hover:bg-gray-800")}
            onClick={() => setIsOpen(!isOpen)}
          >
            <motion.span key={isOpen ? "open" : "closed"} animate={{ opacity: 1 }} initial={{ opacity: isOpen ? 1 : 0 }} transition={{ delay: 0.3 }}>
              {isOpen ? <Minus className="size-5 " /> : <span className="text-sm font-semibold">Chat</span>}
            </motion.span>
          </motion.button>
        </div>
        {isOpen && (
          <div className="flex min-h-0 flex-1 flex-col">
            <ChatMessages messages={messages} isLoading={isLoading} />
            <ChatInput input={input} setInput={setInput} handleSubmit={handleSubmit} />
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default FloatingChatBox
