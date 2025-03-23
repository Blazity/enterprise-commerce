import { create } from "zustand"

interface ToolInvocationState {
  executedToolCallIds: Set<string>
  markToolCallAsExecuted: (toolCallId: string) => void
  hasToolCallExecuted: (toolCallId: string) => boolean
}

export const useToolInvocationStore = create<ToolInvocationState>((set, get) => ({
  executedToolCallIds: new Set<string>(),
  markToolCallAsExecuted: (toolCallId: string) =>
    set((state) => {
      const newSet = new Set(state.executedToolCallIds)
      newSet.add(toolCallId)
      return { executedToolCallIds: newSet }
    }),
  hasToolCallExecuted: (toolCallId: string) => get().executedToolCallIds.has(toolCallId),
}))
