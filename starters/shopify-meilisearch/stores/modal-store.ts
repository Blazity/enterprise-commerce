import { create } from "zustand"

export type Modal = "search" | "facets-mobile" | "review"

interface ModalStore {
  modals: Partial<Record<Modal, boolean>>
  openModal: (modal: Modal) => void
  closeModal: (modal: Modal) => void
  closeAllModals: () => void
}

export const useModalStore = create<ModalStore>((set) => ({
  modals: {},

  openModal: (modalId: Modal) =>
    set((state) => ({
      modals: { ...state.modals, [modalId]: true },
    })),

  closeModal: (modalId: Modal) =>
    set((state) => ({
      modals: { ...state.modals, [modalId]: false },
    })),

  closeAllModals: () =>
    set((state) => ({
      modals: Object.keys(state.modals).reduce(
        (acc, modalId) => {
          acc[modalId as Modal] = false
          return acc
        },
        {} as Record<Modal, boolean>
      ),
    })),
}))
