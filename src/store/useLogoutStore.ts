import { create } from 'zustand';

interface LogoutState {
  isLoggingOut: boolean;
  setIsLoggingOut: (isLoading: boolean) => void;
}

export const useLogoutStore = create<LogoutState>((set) => ({
  isLoggingOut: false,
  setIsLoggingOut: (isLoading) => set({ isLoggingOut: isLoading }),
}));
