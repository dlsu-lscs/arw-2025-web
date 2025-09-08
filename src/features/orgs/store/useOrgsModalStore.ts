import { create } from 'zustand';

interface ModalState {
  isOrgsModalOpen: boolean;
}

interface ModalAction {
  openOrgsModal: () => void;
  closeOrgsModal: () => void;
}

export const useOrgsModalStore = create<ModalState & ModalAction>((set) => ({
  isOrgsModalOpen: false,
  openOrgsModal: () => set({ isOrgsModalOpen: true }),
  closeOrgsModal: () => set({ isOrgsModalOpen: false }),
}));
