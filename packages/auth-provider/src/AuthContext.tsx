import { authService } from "./AuthService";
import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useStore } from "store";

interface AuthContextValue {
  token: string | null;
  login: {
    error: { message: string | null; reset: () => void };
    onLogin: (email: string, password: string) => Promise<void>;
  };
  register: {
    error: { message: string | null; reset: () => void };
    onRegister: (email: string, password: string) => Promise<void>;
  };
  logout: {
    error: { message: string | null; reset: () => void };
    onLogout: () => Promise<void>;
  };
  confirmRegister: {
    error: { message: string | null; reset: () => void };
    onConfirmRegister: (email: string, code: string) => Promise<void>;
  };
  resetPassword: {
    error: { message: string | null; reset: () => void };
    onResetPassword: (email: string) => Promise<void>;
  };
  confirmResetPassword: {
    error: { message: string | null; reset: () => void };
    onConfirmResetPassword: (
      email: string,
      code: string,
      password: string
    ) => Promise<void>;
  };
}

const AuthContext = createContext<AuthContextValue>({
  token: "",
  login: {
    error: { message: null, reset: () => {} },
    onLogin: () => Promise.resolve(),
  },
  register: {
    error: { message: null, reset: () => {} },
    onRegister: () => Promise.resolve(),
  },
  logout: {
    error: { message: null, reset: () => {} },
    onLogout: () => Promise.resolve(),
  },
  confirmRegister: {
    error: { message: null, reset: () => {} },
    onConfirmRegister: () => Promise.resolve(),
  },
  resetPassword: {
    error: { message: null, reset: () => {} },
    onResetPassword: () => Promise.resolve(),
  },
  confirmResetPassword: {
    error: { message: null, reset: () => {} },
    onConfirmResetPassword: () => Promise.resolve(),
  },
});

export const AuthProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const { token, setToken } = useStore();

  const authChannel = useRef(new BroadcastChannel("auth"));

  const [loginError, setLoginError] = useState<string | null>(null);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [logoutError, setLogoutError] = useState<string | null>(null);
  const [confirmRegisterError, setConfirmRegisterError] = useState<
    string | null
  >(null);
  const [resetPasswordError, setResetPasswordError] = useState<string | null>(
    null
  );
  const [confirmResetPasswordError, setConfirmResetPasswordError] = useState<
    string | null
  >(null);

  authChannel.current.onmessage = async (event) => {
    const token = await authService.getToken();
    setToken(token);
  };

  useEffect(() => {
    async function initializeToken() {
      const token = await authService.getToken();
      setToken(token);
    }

    initializeToken();
  }, [setToken]);

  const handleLogin = async (email: string, password: string) => {
    setLoginError(null);
    try {
      await authService.signIn(email, password);
      authChannel.current.postMessage("login");
      const origin = location.state?.from?.pathname ?? "/home";
      navigate(origin);
    } catch (error: any) {
      setLoginError(error.message);
    }
  };

  const handleLogout = async () => {
    setLogoutError(null);
    try {
      await authService.signOut();
      authChannel.current.postMessage("logout");
      navigate("/login");
    } catch (error: any) {
      setLogoutError(error.message);
    }
  };

  const handleRegister = async (email: string, password: string) => {
    setRegisterError(null);
    try {
      await authService.signUp(email, password);
      navigate("/confirm-register");
    } catch (error: any) {
      setRegisterError(error.message);
    }
  };

  const handleConfirmRegister = async (email: string, code: string) => {
    setConfirmRegisterError(null);
    try {
      await authService.confirmSignUp(email, code);
      navigate("/login");
    } catch (error: any) {
      setConfirmRegisterError(error.message);
    }
  };

  const handleResetPassword = async (email: string) => {
    setResetPasswordError(null);
    try {
      await authService.forgotPassword(email);
      navigate("/confirm-reset-password");
    } catch (error: any) {
      setResetPasswordError(error.message);
    }
  };

  const handleConfirmResetPassword = async (
    email: string,
    code: string,
    password: string
  ) => {
    setConfirmResetPasswordError(null);
    try {
      await authService.forgotPasswordSubmit(email, code, password);
      navigate("/login");
    } catch (error: any) {
      setConfirmResetPasswordError(error.message);
    }
  };

  const value = {
    token,
    login: {
      onLogin: handleLogin,
      error: {
        message: loginError,
        reset: () => setLoginError(null),
      },
    },
    register: {
      onRegister: handleRegister,
      error: {
        message: registerError,
        reset: () => setRegisterError(null),
      },
    },
    logout: {
      onLogout: handleLogout,
      error: {
        message: logoutError,
        reset: () => setLogoutError(null),
      },
    },
    confirmRegister: {
      onConfirmRegister: handleConfirmRegister,
      error: {
        message: confirmRegisterError,
        reset: () => setConfirmRegisterError(null),
      },
    },
    resetPassword: {
      onResetPassword: handleResetPassword,
      error: {
        message: resetPasswordError,
        reset: () => setResetPasswordError(null),
      },
    },
    confirmResetPassword: {
      onConfirmResetPassword: handleConfirmResetPassword,
      error: {
        message: confirmResetPasswordError,
        reset: () => setConfirmResetPasswordError(null),
      },
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
