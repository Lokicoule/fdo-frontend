import React from "react";
import { useNavigate } from "react-router-dom";
import { AUTH_ROUTES } from "../../constants/auth-routes.constants";
import { authService } from "../../service/authService";

export const useFacadePasswordReset = () => {
  const navigate = useNavigate();

  const [error, setError] = React.useState<Error | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handlePasswordReset = async (email: string) => {
    setLoading(true);
    try {
      await authService.doPasswordReset(email);
      navigate(AUTH_ROUTES.RESET_PASSWORD);
    } catch (error: any) {
      setError(error);
    }
    setLoading(false);
  };

  return {
    error,
    loading,
    onPasswordReset: handlePasswordReset,
  };
};
