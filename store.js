import { create } from "zustand";

const useStore = create((set) => ({
  shortURL: null,
  setShortURL: (value) => set({ shortURL: value }),
}));

export default useStore;