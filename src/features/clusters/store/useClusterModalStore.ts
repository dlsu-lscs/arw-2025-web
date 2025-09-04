import { create } from 'zustand'

export const useClusterModalStore = create((set) => ({
  isOrgModalOpen: false,
  openOrgModal: () => set({ isOrgModalOpen: true }),
  closeOrgModal: () => set({ isOrgModalOpen: false }),
}))
