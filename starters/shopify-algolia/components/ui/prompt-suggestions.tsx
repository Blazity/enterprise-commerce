import type { ButtonHTMLAttributes } from "react"
import { cn } from "utils/cn"
import { Button } from "./button"

type PromptSuggestionsProps = {
  children: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>

export function PromptSuggestions({ children, className, ...rest }: PromptSuggestionsProps) {
  return (
    <div className={cn("flex flex-wrap gap-1 text-sm", className)} {...rest}>
      {children}
    </div>
  )
}

type PromptSuggestionProps = {
  children: string
  value: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export function PromptSuggestion({ children, className, ...rest }: PromptSuggestionProps) {
  return (
    <Button className={cn("flex-1 grow basis-1/3 rounded-xl p-4", className)} {...rest}>
      {children}
    </Button>
  )
}
