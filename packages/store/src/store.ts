import create from "zustand";

type AuthStoreValue = {
  token: string | null;
  setToken: (token: string | null) => void;
};

export const useStore = create<AuthStoreValue>((set) => ({
  token: null,
  setToken: (token: string | null) => {
    console.log("setToken", token);
    return set({ token });
  },
}));
