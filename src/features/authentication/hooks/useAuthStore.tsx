import React from "react";
import { authService } from "../services";
import { useLogin } from "../stores/authStore";

export const useAuthStore = () => {
  const login = useLogin();
  const [isReady, setIsReady] = React.useState(false);

  async function initAuthStore() {
    setIsReady(false);
    try {
      const [email, groups] = await Promise.all([
        authService.getDataFromIdToken("email"),
        authService.getGroups(),
      ]);
      console.log("email", email);
      console.log("groups", groups);
      if (email) {
        login(email, groups);
      }
    } finally {
      setIsReady(true);
    }
  }

  async function handleReload() {
    await authService.refreshToken();
    await initAuthStore();
  }

  React.useEffect(() => {
    initAuthStore();
  }, []);

  return {
    isReady,
    onReload: handleReload,
  };
};
