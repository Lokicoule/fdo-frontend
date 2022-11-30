import React from "react";
import { authService } from "../services";
import { useLogin } from "../stores/authStore";

export const useAuthStore = () => {
  const login = useLogin();
  const [isReady, setIsReady] = React.useState(false);

  async function initAuthStore() {
    setIsReady(false);
    try {
      const email = await authService.getDataFromIdToken("email");
      if (email) {
        login(email);
      }
    } finally {
      setIsReady(true);
    }
  }

  React.useEffect(() => {
    initAuthStore();
  }, []);

  return {
    isReady,
  };
};
