import React from "react";
import { useNavigate } from "react-router-dom";
import { AUTH_ROUTES } from "../../constants/auth-routes.constants";
import { authService } from "../../service/authService";

export const useFacadeSubmitPasswordReset = () => {
  const navigate = useNavigate();

  const [error, setError] = React.useState<Error | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleSubmitPasswordReset = async (
    email: string,
    code: string,
    password: string
  ) => {
    setLoading(true);
    try {
      await authService.doSubmitPasswordReset(email, code, password);
      navigate(AUTH_ROUTES.LOGIN);
    } catch (error: any) {
      setError(error);
    }
    setLoading(false);
  };

  return {
    error,
    loading,
    onSubmitPasswordReset: handleSubmitPasswordReset,
  };
};
