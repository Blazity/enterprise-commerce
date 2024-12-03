import { openai } from "@ai-sdk/openai"
import { type Message, convertToCoreMessages, streamText } from "ai"
import { systemPrompt } from "lib/ai/prompts"
import { type AllowedTools, tools } from "lib/ai/tools"

const blocksTools: AllowedTools[] = ["searchProducts", "searchCategories"]

const allTools: AllowedTools[] = blocksTools

export async function POST(request: Request) {
  const { messages } = (await request.json()) as { id: string; messages: Array<Message>; modelId: string }

  const coreMessages = convertToCoreMessages(messages)

  const result = streamText({
    model: openai("gpt-4o"),
    system: systemPrompt,
    messages: coreMessages,
    maxSteps: 5,
    experimental_activeTools: allTools,
    abortSignal: request.signal,
    tools: tools,
  })

  return result.toDataStreamResponse()
}
