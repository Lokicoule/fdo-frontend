import { authService } from "./AuthService";
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

interface AuthContextValue {
  token: string | null;
  onLogin: (email: string, password: string) => Promise<void>;
  onLogout: () => Promise<void>;
  onRegister: (email: string, password: string) => Promise<void>;
  onConfirmRegister: (email: string, code: string) => Promise<void>;
  onResetPassword: (email: string) => Promise<void>;
  onConfirmResetPassword: (
    email: string,
    code: string,
    password: string
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  token: "",
  onLogin: async () => {},
  onLogout: async () => {},
  onRegister: async () => {},
  onConfirmRegister: async () => {},
  onResetPassword: async () => {},
  onConfirmResetPassword: async () => {},
});

export const AuthProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const navigate = useNavigate();
  const location = useLocation();

  const authChannel = useRef(new BroadcastChannel("auth"));

  const [token, setToken] = useState<string | null>(
    "default_to_prevent_redirect_when_refreshing"
  );

  async function synchronizeToken() {
    const token = await authService.getToken();
    setToken(token);
  }

  authChannel.current.onmessage = (event) => {
    console.log("event", event);
    synchronizeToken();
  };

  useEffect(() => {
    synchronizeToken();
  }, []);

  const handleLogin = async (email: string, password: string) => {
    const token = await authService.signIn(email, password);
    setToken(token);
    authChannel.current.postMessage("login");
    const origin = location.state?.from?.pathname ?? "/home";
    navigate(origin);
  };

  const handleLogout = async () => {
    await authService.signOut();
    setToken(null);
    authChannel.current.postMessage("logout");
    navigate("/login");
  };

  const handleRegister = async (email: string, password: string) => {
    await authService.signUp(email, password);
    navigate("/confirm-register");
  };

  const handleConfirmRegister = async (email: string, code: string) => {
    await authService.confirmSignUp(email, code);
    navigate("/login");
  };

  const handleResetPassword = async (email: string) => {
    await authService.forgotPassword(email);
  };

  const handleConfirmResetPassword = async (
    email: string,
    code: string,
    password: string
  ) => {
    await authService.forgotPasswordSubmit(email, code, password);
  };

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
    onRegister: handleRegister,
    onConfirmRegister: handleConfirmRegister,
    onResetPassword: handleResetPassword,
    onConfirmResetPassword: handleConfirmResetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
