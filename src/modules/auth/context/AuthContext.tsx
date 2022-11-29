import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useRef,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLogin, useLogout } from "../../../stores/authStore";
import { AUTH_ROUTES } from "../constants/auth-routes.constants";
import { authService } from "../service/authService";

interface AuthContextValue {
  service: typeof authService;
  onLogin: (email: string, password: string) => Promise<void>;
  onRegister: (email: string, password: string) => Promise<void>;
  onLogout: () => Promise<void>;
  onConfirmRegister: (email: string, code: string) => Promise<void>;
  onForgotPassword: (email: string) => Promise<void>;
  onResetPassword: (
    email: string,
    code: string,
    password: string
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  service: authService,
  onLogin: () => Promise.resolve(),
  onRegister: () => Promise.resolve(),
  onLogout: () => Promise.resolve(),
  onConfirmRegister: () => Promise.resolve(),
  onForgotPassword: () => Promise.resolve(),
  onResetPassword: () => Promise.resolve(),
});

export const AuthProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const login = useLogin();
  const logout = useLogout();

  const authChannel = useRef(new BroadcastChannel("auth"));

  authChannel.current.onmessage = (event: MessageEvent<any>) => {
    const { type, payload } = event.data;
    if (type === "login") {
      login(payload.email);
    } else if (type === "logout") {
      logout();
    }
  };

  const handleLogin = async (email: string, password: string) => {
    await authService.doSignInWithEmailAndPassword(email, password);
    authChannel.current.postMessage({ type: "login", payload: { email } });
    const origin = location.state?.from?.pathname ?? "/home";
    navigate(origin);
  };

  const handleLogout = async () => {
    await authService.doSignOut();
    authChannel.current.postMessage({ type: "logout" });
    navigate(AUTH_ROUTES.LOGIN);
  };

  const handleRegister = async (email: string, password: string) => {
    await authService.doSignUpWithEmailAndPassword(email, password);
    navigate(AUTH_ROUTES.CONFIRM_REGISTER);
  };

  const handleConfirmRegister = async (email: string, code: string) => {
    await authService.doSignUpConfirmation(email, code);
    navigate(AUTH_ROUTES.LOGIN);
  };

  const handleForgotPassword = async (email: string) => {
    await authService.doPasswordReset(email);
    navigate(AUTH_ROUTES.RESET_PASSWORD);
  };

  const handleResetPassword = async (
    email: string,
    code: string,
    password: string
  ) => {
    await authService.doSubmitPasswordReset(email, code, password);
    navigate(AUTH_ROUTES.LOGIN);
  };

  const value = {
    service: authService,
    onLogin: handleLogin,
    onRegister: handleRegister,
    onLogout: handleLogout,
    onConfirmRegister: handleConfirmRegister,
    onForgotPassword: handleForgotPassword,
    onResetPassword: handleResetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
