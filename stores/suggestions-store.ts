import { create } from "zustand"

interface SuggestionsStore {
  suggestions: string[]

  setSuggestions: (suggestions: string[]) => void
}

export const useSuggestionsStore = create<SuggestionsStore>((set) => ({
  suggestions: [],

  setSuggestions: (suggestions: string[]) =>
    set((state) => ({
      suggestions,
    })),
}))
