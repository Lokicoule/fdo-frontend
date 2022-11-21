import create from "zustand";

type AuthStoreValue = {
  token: string | null;
  setToken: (token: string | null) => void;
  increment: () => void;
  counter: number;
};

export const useStore = create<AuthStoreValue>((set) => ({
  token: null,
  setToken: (token: string | null) => {
    console.log("setToken", token);
    return set({ token });
  },
  counter: 0,
  increment: () => set((state) => ({ counter: state.counter + 1 })),
}));
