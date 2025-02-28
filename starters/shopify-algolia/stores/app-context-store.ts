import { create } from "zustand"

interface AppContextStore {
  context: string
  setContext: (context: string) => void
}

export const useAppContextStore = create<AppContextStore>()((set) => ({
  context: "",
  setContext: (context) => set(() => ({ context })),
}))
