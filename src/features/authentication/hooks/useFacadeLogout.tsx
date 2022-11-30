import React from "react";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../stores/authStore";
import { AUTH_ROUTES } from "../constants/auth-routes.constants";
import { authService } from "../services/authService";

export const useFacadeLogout = () => {
  const navigate = useNavigate();

  const [error, setError] = React.useState<Error | null>(null);
  const [loading, setLoading] = React.useState(false);
  const logout = useLogout();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await authService.doSignOut();
      logout();
      navigate(AUTH_ROUTES.LOGIN);
    } catch (error: any) {
      setError(error);
    }
    setLoading(false);
  };

  return {
    error,
    loading,
    onLogout: handleLogout,
  };
};
