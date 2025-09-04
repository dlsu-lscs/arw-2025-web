import { create } from 'zustand'

interface ModalStore {
  isOrgModalOpen: boolean
  openOrgModal: () => void
  closeOrgModal: () => void
}

export const useClusterModalStore = create<ModalStore>((set) => ({
  isOrgModalOpen: false,
  openOrgModal: () => set({ isOrgModalOpen: true }),
  closeOrgModal: () => set({ isOrgModalOpen: false }),
}))
