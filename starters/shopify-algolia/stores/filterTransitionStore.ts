import { create } from "zustand"

interface FilterTransitionStore {
  selected: string[]
  set: (filter: string) => void
}

export const useFilterTransitionStore = create<FilterTransitionStore>((set) => ({
  selected: [],
  set: (filter: string) => set((prev) => ({ selected: [...prev.selected, filter] })),
}))
