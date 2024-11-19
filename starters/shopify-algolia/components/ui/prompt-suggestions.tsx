interface PromptSuggestionsProps {
  label?: string | null
  append: (message: { role: "user"; content: string }) => void
  suggestions: string[]
}

export function PromptSuggestions({ label = null, append, suggestions }: PromptSuggestionsProps) {
  return (
    <div>
      {!!label && <h2 className="text-center text-2xl font-bold">{label}</h2>}
      <div className="flex flex-wrap gap-1 text-sm">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => append({ role: "user", content: suggestion })}
            className="flex-1 grow basis-1/3 rounded-xl border bg-background p-4 hover:bg-muted"
          >
            <p>{suggestion}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
