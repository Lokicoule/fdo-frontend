import React from "react";
import { useNavigate } from "react-router-dom";
import { AUTH_ROUTES } from "../constants/auth-routes.constants";
import { authService } from "../services/authService";

export const useFacadeSignUpConfirmation = () => {
  const navigate = useNavigate();
  const [error, setError] = React.useState<Error | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleSignUpConfirmation = async (email: string, code: string) => {
    setLoading(true);
    try {
      await authService.doSignUpConfirmation(email, code);
      navigate(AUTH_ROUTES.LOGIN);
    } catch (error: any) {
      setError(error);
    }
    setLoading(false);
  };

  return {
    error,
    loading,
    onSignUpConfirmation: handleSignUpConfirmation,
  };
};
