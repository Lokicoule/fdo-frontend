import create from "zustand";
import { persist } from "zustand/middleware";

interface ApplicationState {
  readonly isSidebarOpen: boolean;
  setSidebar: (isOpen: boolean) => void;
}

const useApplicationStore = create<ApplicationState>()(
  persist(
    (set) => ({
      isSidebarOpen: false,
      setSidebar: (isOpen) =>
        set((state) => ({ ...state, isSidebarOpen: isOpen })),
    }),
    {
      name: "application",
    }
  )
);

export const useSidebar = () => {
  const { isSidebarOpen, setSidebar } = useApplicationStore();
  return {
    isSidebarOpen,
    toggleSidebar: () => setSidebar(!isSidebarOpen),
  };
};
