import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  user: boolean | null;
  setUser: (user: boolean | null) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'user-storage', // LocalStorage key
    }
  )
);
