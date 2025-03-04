import { PlatformUser } from "lib/shopify/types"
import { create } from "zustand"

interface UserStore {
  user: PlatformUser | null
  setUser: (payload: PlatformUser | null) => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (payload: PlatformUser | null) => set(() => ({ user: payload })),
}))
