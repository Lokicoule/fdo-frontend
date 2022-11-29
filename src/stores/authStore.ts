//https://github.com/pmndrs/zustand/blob/main/docs/guides/slices-pattern.md

import create from "zustand";
import { authService } from "../modules/auth/service/authService";

interface AuthState {
  isReady: boolean;
  email: string | null;
  isLoggedIn: () => boolean;
  login: (email: string | null) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set, get) => ({
  isReady: false,
  email: null,
  isLoggedIn: () => Boolean(get().email),
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
export const useIsReady = () => useAuthStore((state) => state.isReady);
export const useIsLoggedIn = () => useAuthStore((state) => state.isLoggedIn);
export const useLogin = () => useAuthStore((state) => state.login);
export const useLogout = () => useAuthStore((state) => state.logout);

/**
 * Initialize the auth store.
 * This is a workaround for the fact that zustand doesn't support async
 * initialization.
 */
authService.getAccessToken().then((accessToken) => {
  if (Boolean(accessToken)) {
    authService.getDataFromIdToken("email").then((email) => {
      useAuthStore.setState({
        isReady: true,
        email,
      });
    });
  } else {
    useAuthStore.setState({
      isReady: true,
      email: null,
    });
  }
});
