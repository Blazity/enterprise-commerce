"use client"

import { toast } from "sonner"

import { PromptSuggestions } from "components/ui/prompt-suggestions"

export function Suggestions() {
  return (
    <PromptSuggestions
      append={(message) => {
        toast(`Clicked on "${message.content}"`)
      }}
      suggestions={["Show me current best-sellers", "Show me latest deals", "I need a red shoes", "Show me hot deals", "Show me the latest fashion trends"]}
    />
  )
}
