import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLogin } from "../stores/authStore";
import { authService } from "../services/authService";

export const useFacadeLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [error, setError] = React.useState<Error | null>(null);
  const [loading, setLoading] = React.useState(false);
  const login = useLogin();

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    try {
      await authService.doSignInWithEmailAndPassword(email, password);
      login(email);
      const origin = location.state?.from?.pathname ?? "/home";
      navigate(origin);
    } catch (error: any) {
      setError(error);
    }
    setLoading(false);
  };

  return {
    error,
    loading,
    onLogin: handleLogin,
  };
};
