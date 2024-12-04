import { openai } from "@ai-sdk/openai"
import { type Message, convertToCoreMessages, streamText, StreamData } from "ai"
import { z } from "zod"

export const maxDuration = 30

export async function POST(request: Request) {
  const { messages } = (await request.json()) as { id: string; messages: Array<Message>; modelId: string }

  const coreMessages = convertToCoreMessages(messages)

  const streamingData = new StreamData()

  const result = streamText({
    model: openai("gpt-4-turbo"),
    system: prompt,
    messages: coreMessages,
    maxSteps: 5,
    tools: {
      createSuggestions: {
        description: "Create a list of suggestions for the user to explore products.",
        parameters: z.object({}),
      },
    },
    onFinish: () => {
      streamingData.close()
    },
  })

  return result.toDataStreamResponse({
    data: streamingData,
  })
}

const prompt = `
You are a shopping assistant for an e-commerce store, designed to enhance the browsing experience by providing helpful query suggestions. Based on the current conversation context, your primary goal is to suggest relevant next steps or queries in the form of clickable boxes. These suggestions should encourage the user to explore products effortlessly and lead them toward making a purchase.

Focus on the following objectives:
	1.	Ensure suggestions are contextually relevant to the conversation.
	2.	Present concise, actionable query suggestions.
	3.	Encourage product discovery while guiding the user toward a purchase decision.

Your suggestions will appear as clickable boxes that append text to the user’s chat for further exploration. Prioritize relevance and ease of browsing, aiming to create a seamless shopping experience.
`
