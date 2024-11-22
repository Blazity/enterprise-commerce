// Original: https://github.com/vercel/ai-chatbot/blob/main/lib/utils.ts

import type { Message } from "ai"

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
