import { openai } from "@ai-sdk/openai"
import { convertToCoreMessages, type Message, streamObject } from "ai"
import { z } from "zod"

export const maxDuration = 30

export async function POST(request: Request) {
  const messages = (await request.json()) as Message[]
  const coreMessages = convertToCoreMessages(messages)

  const result = streamObject({
    model: openai("gpt-4-turbo"),
    output: "array",
    schema: z.string(),
    prompt: `${prompt}, here's the current conversation context:
${coreMessages.map((m) => m.content).join("\n")}
Please provide a list of suggestions for the user to explore products.`,
  })

  return result.toTextStreamResponse()
}

const prompt = `
You are a shopping assistant for an e-commerce store, designed to enhance the browsing experience by providing helpful query suggestions. Based on the current conversation context, your primary goal is to suggest relevant next steps or queries in the form of clickable boxes. These suggestions should encourage the user to explore products effortlessly and lead them toward making a purchase.

Focus on the following objectives:
	1.	Ensure suggestions are contextually relevant to the conversation.
	2.	Present concise, actionable query suggestions.
	3.	Encourage product discovery while guiding the user toward a purchase decision.
    4. Currently you can only:
        - suggest products, categories, and search queries. For example:
        "Cheapest running shoes"
        "Latest smartphone deals"
        "Hoodies under 250$"
        "Red T-shirts collection"
        - Add to cart if the user wants to buy the product. For example:
                "Add the red t-shirt to the cart"
                "I want the first one"

        

Your suggestions will appear as clickable boxes that append text to the user’s chat for further exploration. Prioritize relevance and ease of browsing, aiming to create a seamless shopping experience.


This is list of available filters:

- price: under or over a certain price (number).
- vendors: Filter by an array of vendor names (strings).
- colors: Filter by an array of colors (strings).
- sortBy: Specify the sorting order (string). Available sorting options:
  - price-high-to-low - most expensive to least expensive
  - price-low-to-high - least expensive to most expensive
  - customer-reviews - most reviews to least reviews
  - newest
  - oldest
`
