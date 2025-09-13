import { create } from 'zustand';

interface ModalState {
  isClusterModalOpen: boolean;
}

interface ModalAction {
  openClusterModal: () => void;
  closeClusterModal: () => void;
}

export const useClusterModalStore = create<ModalState & ModalAction>((set) => ({
  isClusterModalOpen: false,
  openClusterModal: () => set({ isClusterModalOpen: true }),
  closeClusterModal: () => set({ isClusterModalOpen: false }),
}));
