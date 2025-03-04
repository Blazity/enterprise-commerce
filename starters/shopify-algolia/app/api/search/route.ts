import { openai } from "@ai-sdk/openai"
import { convertToCoreMessages, type Message, streamText } from "ai"
import { systemPrompt } from "lib/ai/prompts"
import { type AllowedTools, tools } from "lib/ai/tools"
import { getCategories } from "lib/algolia"

const availableTools: AllowedTools[] = ["searchProducts", "searchCategories", "buildNavigationQuery"]

export async function POST(request: Request) {
  const { messages } = (await request.json()) as { id: string; messages: Array<Message>; modelId: string }

  const referer = request.headers.get("referer") || ""
  const url = new URL(referer)
  const mode = url.searchParams.get("mode") || "pilot"
  const coreMessages = convertToCoreMessages(messages)
  const allCategories = await getCategories()

  const result = streamText({
    model: openai("gpt-4o"),
    system: `${systemPrompt}\n\nYour current mode is ${mode}.\n\nThese are the available categories slugs: ${allCategories.hits.map((c) => c.handle).join(", ")}`,
    messages: coreMessages,
    maxSteps: 10,
    experimental_activeTools: availableTools,
    abortSignal: request.signal,
    tools,
  })

  return result.toDataStreamResponse()
}
