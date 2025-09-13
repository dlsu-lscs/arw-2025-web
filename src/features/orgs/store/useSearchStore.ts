import { create } from 'zustand';

interface SearchState {
  inputValue: string; // The current input value (real-time)
  debouncedSearchTerm: string; // The debounced search term (used for API calls)
  isSearchActive: boolean;
  isTyping: boolean; // Indicates if user is currently typing
}

interface SearchActions {
  setInputValue: (value: string) => void;
  setDebouncedSearchTerm: (term: string) => void;
  setIsTyping: (typing: boolean) => void;
  clearSearch: () => void;
}

export const useSearchStore = create<SearchState & SearchActions>((set) => ({
  inputValue: '',
  debouncedSearchTerm: '',
  isSearchActive: false,
  isTyping: false,
  setInputValue: (value: string) =>
    set({
      inputValue: value,
      isSearchActive: value.trim().length > 0,
    }),
  setDebouncedSearchTerm: (term: string) =>
    set({
      debouncedSearchTerm: term.trim(),
      isTyping: false,
    }),
  setIsTyping: (typing: boolean) => set({ isTyping: typing }),
  clearSearch: () =>
    set({
      inputValue: '',
      debouncedSearchTerm: '',
      isSearchActive: false,
      isTyping: false,
    }),
}));
