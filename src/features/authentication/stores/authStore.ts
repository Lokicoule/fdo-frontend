//https://github.com/pmndrs/zustand/blob/main/docs/guides/slices-pattern.md

import create from "zustand";
import { authService } from "../services/authService";

interface AuthState {
  readonly email: string | null;
  isLoggedIn: () => boolean;
  login: (email: string | null) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set, get) => ({
  email: null,
  isLoggedIn: () => Boolean(authService.getCurrentUser()),
  login: (email: string | null) => {
    set((state) => ({
      ...state,
      email,
    }));
  },
  logout: () => {
    set((state) => ({
      ...state,
      email: null,
    }));
  },
}));

export const useEmail = () => useAuthStore((state) => state.email);
export const useIsLoggedIn = () => useAuthStore((state) => state.isLoggedIn);
export const useLogin = () => useAuthStore((state) => state.login);
export const useLogout = () => useAuthStore((state) => state.logout);
