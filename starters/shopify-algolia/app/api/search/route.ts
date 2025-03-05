import { openai } from "@ai-sdk/openai"
import { convertToCoreMessages, generateObject, type Message, streamText } from "ai"
import { getMostRecentUserMessage } from "lib/ai/chat"
import { classificationPrompt, contextPrompt, searchPrompt } from "lib/ai/prompts"
import { tools } from "lib/ai/tools"
import { z } from "zod"

export async function POST(request: Request) {
  const {
    messages: _messages,
    fullApplicationContext: context,
    filtersContext: availableFilters,
    appliedFilters,
  } = (await request.json()) as {
    messages: Array<Message>
    fullApplicationContext: string
    //@TODO: Make them consitent & prevent unnecessary mapping
    filtersContext: Record<string, unknown>
    appliedFilters: Record<string, unknown>
  }
  const messages = convertToCoreMessages(_messages)
  const lastUserMessage = getMostRecentUserMessage(messages)
  console.log({ appliedFilters, availableFilters })

  const { object: classification } = await generateObject({
    model: openai("gpt-4o-mini"),
    schema: z.object({
      type: z.enum(["context", "search"]),
    }),
    prompt: classificationPrompt(lastUserMessage!, context),
  })

  console.log({ classification })

  try {
    const result = streamText({
      model: openai("gpt-4o"),
      system: classification.type === "search" ? searchPrompt(lastUserMessage!, availableFilters, appliedFilters) : contextPrompt(context, lastUserMessage!, appliedFilters),
      messages,
      maxSteps: 10,
      abortSignal: request.signal,
      experimental_activeTools: classification.type === "search" ? ["searchProducts", "searchCategories", "navigateUser"] : ["navigateUser"],
      tools,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error(error)
  }
}
