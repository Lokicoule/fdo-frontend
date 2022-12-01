//https://github.com/pmndrs/zustand/blob/main/docs/guides/slices-pattern.md

import create from "zustand";
import { persist } from "zustand/middleware";

interface ApplicationState {
  readonly isDrawerOpen: boolean;
  toggleDrawer: () => void;
}

const useApplicationStore = create<ApplicationState>()(
  persist(
    (set) => ({
      isDrawerOpen: false,
      toggleDrawer: () => {
        set((state) => ({
          ...state,
          isDrawerOpen: !state.isDrawerOpen,
        }));
      },
    }),
    {
      name: "application",
    }
  )
);

export const useIsDrawerOpen = () =>
  useApplicationStore((state) => state.isDrawerOpen);
export const useToggleDrawer = () =>
  useApplicationStore((state) => state.toggleDrawer);
