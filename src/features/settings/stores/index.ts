import create from "zustand";
import { persist } from "zustand/middleware";
import { Mode } from "../types";

interface SettingsState {
  readonly mode: Mode;
  setMode: (mode: Mode) => void;
}

const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      mode: "system",
      setMode: (mode) => set((state) => ({ ...state, mode })),
    }),
    {
      name: "settings",
    }
  )
);

export const useMode = () => {
  const { mode, setMode } = useSettingsStore();
  return { mode, setMode };
};
