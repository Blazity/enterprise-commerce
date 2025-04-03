"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { MessagesSquare, Minus, Zap } from "lucide-react"
import { cn } from "utils/cn"
import { MessageList } from "components/ui/message-list"
import { useAiCommerce } from "./ai-commerce-provider"
import type { Message } from "ai"
import { ChatInput } from "./chat-input"

const SUGGESTED_PROMPTS = ["Show me all products under $100", "Go to checkout", "Add this product to cart"]

type ChatMessagesProps = {
  messages: Message[]
  isLoading: boolean
  handleSuggestionSubmit: (suggestion: string) => void
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
    <motion.div
      initial={{ scale: 0.4, opacity: 0, originX: 0.5, originY: 0.5 }}
      animate={{ scale: 1, opacity: 1, originX: 0.5, originY: 0.5 }}
      exit={{ scale: 0.4, opacity: 0, originX: 0.5, originY: 0.5 }}
      transition={{ type: "spring", duration: 0.3, bounce: 0 }}
      onAnimationComplete={shouldHideScrollbar ? () => setShouldHideScrollbar(false) : undefined}
      className={cn(
        shouldHideScrollbar ? "overflow-y-hidden" : "",
        "relative flex h-full flex-col overflow-x-hidden py-2 pl-3 pr-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-200"
      )}
      ref={scrollRef}
      onScroll={handleScroll}
    >
      <MessageList messages={messages} showTimeStamps={false} isTyping={isTyping} messageOptions={{ animation: "scale", showTimeStamp: true, showToolMessages: false }} />
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
    </motion.div>
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

export const FloatingChatBox = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { messages, isLoading, input, setInput, handleSubmit, append } = useAiCommerce()

  const chatVariants = {
    closed: {
      width: "48px",
      height: "48px",
      borderRadius: "24px",
      maxWidth: "90vw",
      opacity: 1,
    },
    open: {
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
      key="chat-wrapper"
      className="floating-chat-box fixed bottom-4 right-4 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg md:bottom-8 md:right-8 md:hidden"
      layoutId="chat-wrapper"
      initial={"closed"}
      animate={isOpen ? "open" : "closed"}
      variants={chatVariants}
      transition={{
        type: "spring",
        duration: 0.6,
        bounce: 0,
      }}
    >
      {!isOpen ? (
        <motion.button className="flex size-full items-center justify-center rounded-full bg-white" onClick={() => setIsOpen(true)}>
          <motion.span animate={{ opacity: 1 }} initial={{ opacity: 0 }} transition={{ delay: 0.3 }}>
            <MessagesSquare className="size-5 text-black" />
          </motion.span>
        </motion.button>
      ) : (
        <div className="flex h-full flex-col">
          <div className="flex shrink-0 items-center justify-between p-3">
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
                  duration: 0.5,
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
                  className="shrink-0 p-3"
                >
                  <ChatInput input={input} setInput={setInput} handleSubmit={handleSubmit} isTyping={isLoading} append={append} />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.section>
  )
}
