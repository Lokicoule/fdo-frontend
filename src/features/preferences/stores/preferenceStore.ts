//https://github.com/pmndrs/zustand/blob/main/docs/guides/slices-pattern.md

import create from "zustand";
import { persist } from "zustand/middleware";

type Mode = "light" | "dark" | null;

interface PreferenceState {
  readonly mode: Mode;
  setMode: (mode: Mode) => void;
  toggleMode: () => void;
}

const usePreferenceStore = create<PreferenceState>()(
  persist(
    (set) => ({
      mode: null,
      setMode: (mode: Mode) => set({ mode }),
      toggleMode: () => {
        set((state) => ({
          ...state,
          mode: state.mode === "light" ? "dark" : "light",
        }));
      },
    }),
    {
      name: "preferences",
    }
  )
);

export const useMode = () => usePreferenceStore((state) => state.mode);
export const useSetMode = () => usePreferenceStore((state) => state.setMode);
export const useToggleMode = () =>
  usePreferenceStore((state) => state.toggleMode);
