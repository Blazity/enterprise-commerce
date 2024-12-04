// Origin: https://github.com/vercel/ai-chatbot/blob/main/lib/utils.ts

import type { CoreAssistantMessage, CoreMessage, CoreToolMessage, Message } from "ai"

export function sanitizeUIMessages(messages: Array<Message>): Array<Message> {
  const messagesBySanitizedToolInvocations = messages.map((message) => {
    if (message.role !== "assistant") return message

    if (!message.toolInvocations) return message

    const toolResultIds: Array<string> = []

    for (const toolInvocation of message.toolInvocations) {
      if (toolInvocation.state === "result") {
        toolResultIds.push(toolInvocation.toolCallId)
      }
    }

    const sanitizedToolInvocations = message.toolInvocations.filter((toolInvocation) => toolInvocation.state === "result" || toolResultIds.includes(toolInvocation.toolCallId))

    return {
      ...message,
      toolInvocations: sanitizedToolInvocations,
    }
  })

  return messagesBySanitizedToolInvocations.filter((message) => message.content.length > 0 || (message.toolInvocations && message.toolInvocations.length > 0))
}

export function sanitizeResponseMessages(messages: Array<CoreToolMessage | CoreAssistantMessage>): Array<CoreToolMessage | CoreAssistantMessage> {
  const toolResultIds: Array<string> = []

  for (const message of messages) {
    if (message.role === "tool") {
      for (const content of message.content) {
        if (content.type === "tool-result") {
          toolResultIds.push(content.toolCallId)
        }
      }
    }
  }

  const messagesBySanitizedContent = messages.map((message) => {
    if (message.role !== "assistant") return message

    if (typeof message.content === "string") return message

    const sanitizedContent = message.content.filter((content) =>
      content.type === "tool-call" ? toolResultIds.includes(content.toolCallId) : content.type === "text" ? content.text.length > 0 : true
    )

    return {
      ...message,
      content: sanitizedContent,
    }
  })

  return messagesBySanitizedContent.filter((message) => message.content.length > 0)
}

export function getMostRecentUserMessage(messages: Array<CoreMessage>) {
  const userMessages = messages.filter((message) => message.role === "user")
  return userMessages.at(-1)
}
