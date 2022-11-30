//https://github.com/pmndrs/zustand/blob/main/docs/guides/slices-pattern.md

import create from "zustand";
import { persist } from "zustand/middleware";

type Mode = "light" | "dark" | null;

interface PreferenceState {
  readonly mode: Mode;
  readonly isDrawerOpen: boolean;
  setMode: (mode: Mode) => void;
  toggleMode: () => void;
  toggleDrawer: () => void;
}

const usePreferenceStore = create<PreferenceState>()(
  persist(
    (set) => ({
      mode: null,
      isDrawerOpen: false,
      setMode: (mode: Mode) => set({ mode }),
      toggleMode: () => {
        set((state) => ({
          ...state,
          mode: state.mode === "light" ? "dark" : "light",
        }));
      },
      toggleDrawer: () => {
        set((state) => ({
          ...state,
          isDrawerOpen: !state.isDrawerOpen,
        }));
      },
    }),
    {
      name: "preferences",
    }
  )
);

export const useMode = () => usePreferenceStore((state) => state.mode);
export const useIsDrawerOpen = () =>
  usePreferenceStore((state) => state.isDrawerOpen);
export const useSetMode = () => usePreferenceStore((state) => state.setMode);
export const useToggleMode = () =>
  usePreferenceStore((state) => state.toggleMode);
export const useToggleDrawer = () =>
  usePreferenceStore((state) => state.toggleDrawer);
