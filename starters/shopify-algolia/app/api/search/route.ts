import { openai } from "@ai-sdk/openai"
import { convertToCoreMessages, type Message, streamText } from "ai"
import { systemPrompt } from "lib/ai/prompts"
import { tools } from "lib/ai/tools"

export async function POST(request: Request) {
  const { messages } = (await request.json()) as {
    id: string
    messages: Array<Message>
    modelId: string
  }

  const coreMessages = convertToCoreMessages(messages)

  try {
    const result = streamText({
      model: openai("gpt-4o"),
      system: systemPrompt,
      messages: coreMessages,
      maxSteps: 10,
      abortSignal: request.signal,
      tools,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error(error)
  }
}
