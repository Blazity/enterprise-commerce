import React, { useEffect, useRef } from "react"
import { ChatMessage, ChatMessageProps, Message } from "./chat-message"
import { TypingIndicator } from "./typing-indicator"

type AdditionalMessageOptions = Omit<ChatMessageProps, keyof Message>

interface MessageListProps {
  messages: Message[]
  showTimeStamps?: boolean
  isTyping?: boolean
  messageOptions?: AdditionalMessageOptions | ((message: Message) => AdditionalMessageOptions)
}

export function MessageList({ messages, showTimeStamps = true, isTyping = false, messageOptions }: MessageListProps) {
  const messageListRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div ref={messageListRef} className="space-y-4 overflow-auto py-8 pr-3">
      {messages.map((message, index) => {
        const additionalOptions = typeof messageOptions === "function" ? messageOptions(message) : messageOptions

        return <ChatMessage key={index} showTimeStamp={showTimeStamps} {...message} {...additionalOptions} />
      })}
      {isTyping && <TypingIndicator />}
    </div>
  )
}
