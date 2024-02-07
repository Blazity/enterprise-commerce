import { create } from "zustand"

export type Step = "project-directory" | "package-manager" | "shopify-storefront-api-token" | "meilisearch-api-token"

type CompletedStepsValues = {
  completedSteps: Step[]
}

type CompletedStepsActions = {
  getCurrentStep: () => Step
  addCompletedStep: (step: Step) => void
}

type CompletedStepsState = CompletedStepsValues & CompletedStepsActions

export const useCompletedStepsStore = create<CompletedStepsState>()((set, get) => ({
  completedSteps: [],
  addCompletedStep: (step) => set((state) => ({ completedSteps: [...state.completedSteps, step] })),
  getCurrentStep: () => get().completedSteps[get().completedSteps.length - 1],
}))
