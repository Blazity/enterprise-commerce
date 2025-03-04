import type { ButtonHTMLAttributes } from "react"
import { cn } from "utils/cn"
import { Button } from "./button"

type PromptSuggestionsProps = {
  children: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>

export function PromptSuggestions({ children, className, ...rest }: PromptSuggestionsProps) {
  return (
    <div className={cn("grid grid-cols-1 gap-2 text-sm", className)} {...rest}>
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
    <Button className={cn("flex w-full whitespace-normal rounded-none p-6", className)} {...rest}>
      {children}
    </Button>
  )
}
