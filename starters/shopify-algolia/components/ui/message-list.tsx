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
  return (
    <div className="my-4 space-y-4 overflow-visible">
      {messages.map((message, index) => {
        const additionalOptions = typeof messageOptions === "function" ? messageOptions(message) : messageOptions

        return <ChatMessage key={index} showTimeStamp={showTimeStamps} {...message} {...additionalOptions} />
      })}
      {isTyping && <TypingIndicator />}
    </div>
  )
}
