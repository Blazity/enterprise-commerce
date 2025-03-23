"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { MessagesSquare, Mic, Minus, SendHorizontal, X, Zap } from "lucide-react"
import { cn } from "utils/cn"
import { Textarea } from "components/ui/textarea"
import { MessageList } from "components/ui/message-list"
import { useAiCommerce } from "./ai-commerce-provider"
import { useSpeechRecognition } from "./use-speech-recognition"
import { env } from "env.mjs"
import type { Message } from "ai"
import { useMediaQuery } from "@uidotdev/usehooks"

const SUGGESTED_PROMPTS = ["Show me all products under $100", "Go to checkout", "Add this product to cart"]

type ChatMessagesProps = {
  messages: Message[]
  isLoading: boolean
  handleSuggestionSubmit: (suggestion: string) => void
}

type ChatInputProps = {
  input: string
  setInput: (value: string) => void
  handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => void
}

const ChatMessages = ({ messages, isLoading, handleSuggestionSubmit }: ChatMessagesProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true)
  const lastScrollTop = useRef(0)
  const [suggestions, setSuggestions] = useState<string[]>(SUGGESTED_PROMPTS)
  const [shouldHideScrollbar, setShouldHideScrollbar] = useState(true)

  const scrollToBottom = useCallback(() => {
    const scrollContainer = scrollRef.current
    if (scrollContainer) {
      scrollContainer.scrollTo({
        top: scrollContainer.scrollHeight,
        behavior: "smooth",
      })
    }
  }, [])

  useEffect(() => {
    if (!shouldAutoScroll) return

    const raf = requestAnimationFrame(() => {
      scrollToBottom()
    })
    return () => cancelAnimationFrame(raf)
  }, [messages, isLoading, shouldAutoScroll, scrollToBottom])

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget
    const { scrollTop, scrollHeight, clientHeight } = target
    const SCROLL_BUFFER = 5

    if (scrollTop < lastScrollTop.current) {
      setShouldAutoScroll(false)
    } else {
      const isAtBottom = scrollHeight - (scrollTop + clientHeight) < SCROLL_BUFFER
      setShouldAutoScroll(isAtBottom)
    }

    lastScrollTop.current = scrollTop
  }, [])

  const handleSuggestionClick = (suggestion: string) => {
    setSuggestions([])
    handleSuggestionSubmit(suggestion)
  }

  const isTyping = isLoading && messages.length > 0 && messages[messages.length - 1].role === "user"

  return (
    <div className="relative flex h-full flex-col py-2 pl-4 pr-1">
      <motion.div
        initial={{ scale: 0.4, opacity: 0, originX: 0.5, originY: 0.5 }}
        animate={{ scale: 1, opacity: 1, originX: 0.5, originY: 0.5 }}
        exit={{ scale: 0.4, opacity: 0, originX: 0.5, originY: 0.5 }}
        transition={{ type: "spring", duration: 0.3, bounce: 0 }}
        onAnimationComplete={shouldHideScrollbar ? () => setShouldHideScrollbar(false) : undefined}
        className={cn(
          shouldHideScrollbar ? "overflow-y-hidden" : "overflow-y-auto",
          "flex-1 overflow-x-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-200"
        )}
        ref={scrollRef}
        onScroll={handleScroll}
      >
        <MessageList messages={messages} showTimeStamps={false} isTyping={isTyping} messageOptions={{ animation: "scale", showTimeStamp: true, showToolMessages: false }} />
      </motion.div>
      {messages.length === 0 && suggestions.length > 0 && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0, originX: 0.5, originY: 0.5 }}
          animate={{ scale: 1, opacity: 1, originX: 0.5, originY: 0.5 }}
          exit={{ scale: 0.8, opacity: 0, originX: 0.5, originY: 0.5 }}
          transition={{ type: "spring", duration: 0.3, bounce: 0, delay: 0.1 }}
          className="absolute inset-0 flex items-center justify-center p-4"
        >
          <div className="flex max-w-full flex-wrap justify-center gap-2">
            {suggestions.map((suggestion, index) => (
              <Suggestion key={index} suggestion={suggestion} handleSuggestionClick={handleSuggestionClick} index={index} />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
const Suggestion = ({ suggestion, handleSuggestionClick, index }: { suggestion: string; index: number; handleSuggestionClick: (suggestion: string) => void }) => {
  const [shouldDelay, setShouldDelay] = useState(true)
  return (
    <motion.button
      key={suggestion}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      onAnimationComplete={shouldDelay ? () => setShouldDelay(false) : undefined}
      transition={{
        type: "spring",
        duration: 0.3,
        bounce: 0,
        delay: shouldDelay ? 0.15 + index * 0.05 : 0,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => handleSuggestionClick(suggestion)}
      className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 focus:outline-none"
    >
      {suggestion}
    </motion.button>
  )
}
const ChatInput = ({ input, setInput, handleSubmit }: ChatInputProps) => {
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
      if (input) {
        adjustHeight()
      }
    }
  }, [input, adjustHeight])

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
            "w-full resize-none rounded-md bg-gray-100 px-2 py-1 text-sm scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-200 focus-visible:ring-gray-300",
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
              "z-10 flex size-8 items-center justify-center rounded-full p-1.5 text-gray-700 hover:bg-gray-200",
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
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [isOpen, setIsOpen] = useState(false)
  const { messages, isLoading, input, setInput, handleSubmit, append } = useAiCommerce()

  const chatVariants = {
    closed: {
      width: "280px",
      height: "48px",
      opacity: 1,
    },
    open: {
      width: "360px",
      height: "450px",
      opacity: 1,
    },
    mobileClosed: {
      width: "48px",
      height: "48px",
      borderRadius: "24px",
      maxWidth: "90vw",
      opacity: 1,
    },
    mobileOpen: {
      width: "500px",
      maxWidth: "calc(100vw - 2rem)",
      height: "450px",
      borderRadius: "8px",
      opacity: 1,
    },
  }

  const handleSuggestionSubmit = useCallback(
    (suggestion: string) => {
      append({
        role: "user",
        content: suggestion,
      })
    },
    [append]
  )

  return (
    <motion.section
      key={`chat-wrapper-${isMobile}`}
      className="fixed bottom-4 right-4 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg md:bottom-8 md:right-8"
      layoutId="chat-wrapper"
      initial={isMobile ? "mobileClosed" : "closed"}
      animate={isOpen ? (isMobile ? "mobileOpen" : "open") : isMobile ? "mobileClosed" : "closed"}
      variants={chatVariants}
      transition={
        isMobile
          ? {
              type: "spring",
              duration: 0.6,
              bounce: 0,
            }
          : {
              type: "spring",
              duration: 0.4,
              bounce: 0,
            }
      }
    >
      {isMobile && !isOpen ? (
        <motion.button className="flex size-full items-center justify-center rounded-full bg-white" onClick={() => setIsOpen(true)}>
          <motion.span animate={{ opacity: 1 }} initial={{ opacity: 0 }} transition={{ delay: 0.3 }}>
            <MessagesSquare className="size-5 text-black" />
          </motion.span>
        </motion.button>
      ) : (
        <div className="flex h-full flex-col">
          <div className="flex shrink-0 items-center justify-between p-2">
            <div className="flex items-center space-x-2">
              <Zap className="size-5" />
              <motion.span layoutId="title" className="text-sm font-medium text-gray-800">
                Commerce Assistant
              </motion.span>
            </div>
            <motion.button
              layoutId="chatButton"
              className={cn(isOpen ? "bg-transparent text-gray-600 hover:text-gray-800" : "rounded-md bg-black px-4 py-1 text-white transition-colors hover:bg-gray-800")}
              onClick={() => setIsOpen(!isOpen)}
            >
              <motion.span key={isOpen ? "open" : "closed"} animate={{ opacity: 1 }} initial={{ opacity: isOpen ? 1 : 0 }} transition={{ delay: 0.3 }}>
                {isOpen ? <Minus className="size-5" /> : <span className="text-sm font-semibold">Chat</span>}
              </motion.span>
            </motion.button>
          </div>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -32, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                transition={{
                  type: "spring",
                  duration: isMobile ? 0.5 : 0.4,
                  bounce: 0,
                }}
                className="flex flex-1 flex-col overflow-hidden"
              >
                <motion.div
                  initial={{ scale: 0.4, opacity: 0, originX: 0.5, originY: 0.5 }}
                  animate={{ scale: 1, opacity: 1, originX: 0.5, originY: 0.5 }}
                  exit={{ scale: 0.4, opacity: 0, originX: 0.5, originY: 0.5 }}
                  transition={{
                    type: "spring",
                    duration: 0.3,
                    bounce: 0,
                    delay: 0.05,
                  }}
                  className="flex-1 overflow-y-auto"
                >
                  <ChatMessages messages={messages} isLoading={isLoading} handleSuggestionSubmit={handleSuggestionSubmit} />
                </motion.div>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0, originX: 0.5, originY: 0.5 }}
                  animate={{ scale: 1, opacity: 1, originX: 0.5, originY: 0.5 }}
                  exit={{ scale: 0.8, opacity: 0, originX: 0.5, originY: 0.5 }}
                  transition={{
                    type: "spring",
                    duration: 0.3,
                    bounce: 0,
                    delay: 0.1,
                  }}
                  className="shrink-0"
                >
                  <ChatInput input={input} setInput={setInput} handleSubmit={handleSubmit} />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.section>
  )
}
