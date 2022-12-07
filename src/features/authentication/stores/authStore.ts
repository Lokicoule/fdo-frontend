//https://github.com/pmndrs/zustand/blob/main/docs/guides/slices-pattern.md

import create from "zustand";
import { authService } from "../services/authService";

interface AuthState {
  readonly email: string | null;
  readonly groups: string[] | null;
  isLoggedIn: () => boolean;
  login: (email: string | null, groups?: string[] | null) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set, get) => ({
  email: null,
  groups: [],
  isLoggedIn: () => Boolean(authService.getCurrentUser()),
  login: (email: string | null, groups?: string[] | null) => {
    set((state) => ({
      ...state,
      email,
      groups: groups || [],
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
export const useGroups = () => useAuthStore((state) => state.groups);
export const useIsLoggedIn = () => useAuthStore((state) => state.isLoggedIn);
export const useLogin = () => useAuthStore((state) => state.login);
export const useLogout = () => useAuthStore((state) => state.logout);
