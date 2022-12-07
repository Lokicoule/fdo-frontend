import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLogin, useLogout } from "../stores/authStore";
import { authService } from "../services/authService";
import { AUTH_ROUTES } from "../constants/auth-routes.constants";

export const useAuthService = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const login = useLogin();
  const logout = useLogout();

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    try {
      await authService.doSignInWithEmailAndPassword(email, password);
      const groups = await authService.getGroups();
      login(email, groups);
      const origin = location.state?.from?.pathname ?? "/home";
      navigate(origin);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await authService.doSignOut();
      logout();
      navigate(AUTH_ROUTES.LOGIN);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (email: string) => {
    setLoading(true);
    try {
      await authService.doPasswordReset(email);
      navigate(AUTH_ROUTES.RESET_PASSWORD);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (email: string, password: string) => {
    setLoading(true);
    try {
      await authService.doSignUpWithEmailAndPassword(email, password);
      navigate(AUTH_ROUTES.CONFIRM_REGISTER);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpConfirmation = async (email: string, code: string) => {
    setLoading(true);
    try {
      await authService.doSignUpConfirmation(email, code);
      navigate(AUTH_ROUTES.LOGIN);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

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
    } finally {
      setLoading(false);
    }
  };

  return {
    error,
    loading,
    onLogin: handleLogin,
    onLogout: handleLogout,
    onPasswordReset: handlePasswordReset,
    onRegister: handleRegister,
    onSignUpConfirmation: handleSignUpConfirmation,
    onSubmitPasswordReset: handleSubmitPasswordReset,
  };
};
