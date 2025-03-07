import { openai } from "@ai-sdk/openai"
import { convertToCoreMessages, generateObject, type Message, streamText } from "ai"
import { getMostRecentUserMessage } from "lib/ai/chat"
import { classificationPrompt, contextPrompt, searchPrompt, systemPrompt } from "lib/ai/prompts"
import { tools as allTools } from "lib/ai/tools"
import { z } from "zod"

export async function POST(request: Request) {
  const {
    messages: _messages,
    fullApplicationContext: context,
    availableFilters,
    appliedFilters,
  } = (await request.json()) as {
    messages: Array<Message>
    fullApplicationContext: string
    //@TODO: Make them consitent & prevent unnecessary mapping
    availableFilters: string
    appliedFilters: Record<string, unknown>
  }
  const messages = convertToCoreMessages(_messages)
  const lastUserMessage = getMostRecentUserMessage(messages)

  try {
    const { object: classification } = await generateObject({
      model: openai("gpt-4o-mini"),
      schema: z.object({
        type: z.enum(["context", "search"]),
      }),
      prompt: classificationPrompt(lastUserMessage!, context, availableFilters),
    })

    const tools =
      classification.type === "search" ? allTools : Object.fromEntries(Object.entries(allTools).filter(([key]) => key !== "searchProducts" && key !== "searchCategories"))

    const result = streamText({
      model: openai("gpt-4o"),
      system: `${systemPrompt}\n
${classification.type === "search" ? searchPrompt(lastUserMessage!, availableFilters, appliedFilters) : contextPrompt(context, lastUserMessage!, appliedFilters)}`,
      messages,
      maxSteps: 10,
      abortSignal: request.signal,
      experimental_activeTools: classification.type === "search" ? ["searchProducts", "searchCategories", "navigateUser"] : ["navigateUser", "addToCart", "goToCheckout"],
      tools,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error(error)
  }
}
