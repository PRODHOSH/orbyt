import { create } from "zustand";

interface SidebarStore {
  isOpen: boolean;
  toggle: () => void;
  setIsOpen: (value: boolean) => void;
}

export const useSidebar = create<SidebarStore>((set) => ({
  isOpen: true,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  setIsOpen: (value) => set({ isOpen: value }),
}));
