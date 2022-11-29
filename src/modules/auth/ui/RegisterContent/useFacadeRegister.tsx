import React from "react";
import { useNavigate } from "react-router-dom";
import { AUTH_ROUTES } from "../../constants/auth-routes.constants";
import { authService } from "../../service/authService";

export const useFacadeRegister = () => {
  const navigate = useNavigate();

  const [error, setError] = React.useState<Error | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleRegister = async (email: string, password: string) => {
    setLoading(true);
    try {
      await authService.doSignUpWithEmailAndPassword(email, password);
      navigate(AUTH_ROUTES.CONFIRM_REGISTER);
    } catch (error: any) {
      setError(error);
    }
    setLoading(false);
  };

  return {
    error,
    loading,
    onRegister: handleRegister,
  };
};
