import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useStore } from "store";
import { authService } from "./AuthService";

interface AuthContextValue {
  token: string | null;
  email: string | null;
  paths: typeof AUTH_PATHS;
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
  forgotPassword: {
    error: { message: string | null; reset: () => void };
    onForgotPassword: (email: string) => Promise<void>;
  };
  resetPassword: {
    error: { message: string | null; reset: () => void };
    onResetPassword: (
      email: string,
      code: string,
      password: string
    ) => Promise<void>;
  };
}

const AUTH_PATHS = {
  LOGIN_PATH: "/login",
  //LOGOUT_PATH: "/logout",
  FORGOT_PASSWORD_PATH: "/forgot-password",
  RESET_PASSWORD_PATH: "/reset-password",
  REGISTER_PATH: "/register",
  CONFIRM_REGISTER_PATH: "/confirm-register",
};

const AuthContext = createContext<AuthContextValue>({
  token: "",
  email: null,
  paths: AUTH_PATHS,
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
  forgotPassword: {
    error: { message: null, reset: () => {} },
    onForgotPassword: () => Promise.resolve(),
  },
  resetPassword: {
    error: { message: null, reset: () => {} },
    onResetPassword: () => Promise.resolve(),
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
  const [forgotPasswordError, setForgotPasswordError] = useState<string | null>(
    null
  );

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
      navigate(AUTH_PATHS.LOGIN_PATH);
    } catch (error: any) {
      setLogoutError(error.message);
    }
  };

  const handleRegister = async (email: string, password: string) => {
    setRegisterError(null);
    try {
      await authService.signUp(email, password);
      navigate(AUTH_PATHS.CONFIRM_REGISTER_PATH);
    } catch (error: any) {
      setRegisterError(error.message);
    }
  };

  const handleConfirmRegister = async (email: string, code: string) => {
    setConfirmRegisterError(null);
    try {
      await authService.confirmSignUp(email, code);
      navigate(AUTH_PATHS.LOGIN_PATH);
    } catch (error: any) {
      setConfirmRegisterError(error.message);
    }
  };

  const handleForgotPassword = async (email: string) => {
    setForgotPasswordError(null);
    try {
      await authService.forgotPassword(email);
      navigate(AUTH_PATHS.RESET_PASSWORD_PATH);
    } catch (error: any) {
      setForgotPasswordError(error.message);
    }
  };

  const handleResetPassword = async (
    email: string,
    code: string,
    password: string
  ) => {
    setResetPasswordError(null);
    try {
      await authService.forgotPasswordSubmit(email, code, password);
      navigate(AUTH_PATHS.LOGIN_PATH);
    } catch (error: any) {
      setResetPasswordError(error.message);
    }
  };

  const value = {
    token,
    email: authService.getCurrentUser()?.getUsername() ?? null,
    paths: AUTH_PATHS,
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
    forgotPassword: {
      onForgotPassword: handleForgotPassword,
      error: {
        message: forgotPasswordError,
        reset: () => setForgotPasswordError(null),
      },
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
