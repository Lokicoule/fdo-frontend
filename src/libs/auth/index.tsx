import React, { useContext, useState } from "react";
import { AuthUser } from "~/features/auth";
import { authService } from "./auth-service";

type AuthContextType = {
  user?: AuthUser;
  isLoading?: boolean;
  error?: Error;
  onLogin: (email: string, password: string) => Promise<void>;
  onLogout: () => Promise<void>;
  onRegister: (email: string, password: string) => Promise<void>;
  onRegisterConfirmation: (email: string, code: string) => Promise<void>;
  onForgotPassword: (email: string) => Promise<void>;
  onForgotPasswordConfirmation: (
    email: string,
    code: string,
    password: string
  ) => Promise<void>;
};

const AuthContext = React.createContext<AuthContextType>({
  onLogin: async (email, password) => {},
  onLogout: async () => {},
  onRegister: async (email, password) => {},
  onRegisterConfirmation: async (email, code) => {},
  onForgotPassword: async (email) => {},
  onForgotPasswordConfirmation: async (email, code, password) => {},
} satisfies AuthContextType);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FunctionComponent<React.PropsWithChildren> = (
  props
) => {
  const { children } = props;

  const [user, setUser] = useState<AuthUser | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await authService.doSignInWithEmailAndPassword(email, password);
      const groups = await authService.getGroups();
      const username = authService.getCurrentUser()?.getUsername();
      setUser({ username, email, groups });
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await authService.doSignOut();
      setUser(undefined);
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await authService.doSignUpWithEmailAndPassword(email, password);
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterConfirmation = async (email: string, code: string) => {
    setIsLoading(true);
    try {
      await authService.doSignUpConfirmation(email, code);
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (email: string) => {
    setIsLoading(true);
    try {
      await authService.doPasswordReset(email);
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPasswordConfirmation = async (
    email: string,
    code: string,
    password: string
  ) => {
    setIsLoading(true);
    try {
      await authService.doSubmitPasswordReset(email, code, password);
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    error,
    isLoading,
    onLogin: handleLogin,
    onLogout: handleLogout,
    onRegister: handleRegister,
    onRegisterConfirmation: handleRegisterConfirmation,
    onForgotPassword: handleForgotPassword,
    onForgotPasswordConfirmation: handleForgotPasswordConfirmation,
  };

  return (
    <AuthContext.Provider value={value} {...props}>
      {children}
    </AuthContext.Provider>
  );
};
