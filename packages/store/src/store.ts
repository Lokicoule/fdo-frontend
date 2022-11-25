import create from "zustand";

type AuthStoreValue = {
  token: string | null;
  setToken: (token: string | null) => void;
  email: string | null;
  setEmail: (email: string | null) => void;
};

export const useStore = create<AuthStoreValue>((set) => ({
  token: null,
  setToken: (token: string | null) => {
    console.log("setToken", token);
    return set({ token });
  },
  email: null,
  setEmail: (email: string | null) => {
    console.log("setEmail", email);
    return set({ email });
  },
}));
