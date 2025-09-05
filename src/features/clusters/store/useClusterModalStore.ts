import { create } from 'zustand'

interface ModalState {
  isOrgModalOpen: boolean
}

interface ModalAction {
  openOrgModal: () => void
  closeOrgModal: () => void
}

export const useClusterModalStore = create<ModalState & ModalAction>((set) => ({
  isOrgModalOpen: false,
  openOrgModal: () => set({ isOrgModalOpen: true }),
  closeOrgModal: () => set({ isOrgModalOpen: false }),
}))
