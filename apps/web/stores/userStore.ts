import { PlatformUser } from "@enterprise-commerce/core/platform/types"
import { create } from "zustand"

interface UserStore {
  user: PlatformUser | null
  setUser: (payload: PlatformUser | null) => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (payload: PlatformUser) => set(() => ({ user: payload })),
}))
