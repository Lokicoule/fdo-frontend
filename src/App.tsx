import HomeIcon from "@mui/icons-material/Home";
import { AUTH_ROUTES } from "./features/authentication/constants/auth-routes.constants";
import { AppShell } from "./layouts/AppShell";
import PreventAuth from "./features/authentication/components/PreventAuth";
import RequireAuth from "./features/authentication/components/RequireAuth";
import {
  ConfirmRegisterContent,
  ForgotPasswordContent,
  LoginContent,
  LogoutButton,
  RegisterContent,
  ResetPasswordContent,
} from "./features/authentication/components";
import { CreateUserContent } from "./features/user/components/CreateUserContent";

function App() {
  return (
    <AppShell
      title="Fruits d'orient home"
      render={<LogoutButton />}
      routes={[
        {
          path: "/",
          element: () => <div>Home</div>,
        },
        {
          path: "/home",
          element: () => <div>Home</div>,
        },
        {
          path: AUTH_ROUTES.REGISTER,
          element: () => (
            <PreventAuth redirectTo="/home">
              <RegisterContent />
            </PreventAuth>
          ),
        },
        {
          path: AUTH_ROUTES.CONFIRM_REGISTER,
          element: () => (
            <PreventAuth redirectTo="/home">
              <ConfirmRegisterContent />
            </PreventAuth>
          ),
        },
        {
          path: AUTH_ROUTES.LOGIN,
          element: () => (
            <PreventAuth redirectTo="/home">
              <LoginContent />
            </PreventAuth>
          ),
        },
        {
          path: AUTH_ROUTES.RESET_PASSWORD,
          element: () => (
            <PreventAuth redirectTo="/home">
              <ResetPasswordContent />
            </PreventAuth>
          ),
        },
        {
          path: AUTH_ROUTES.FORGOT_PASSWORD,
          element: () => (
            <PreventAuth redirectTo="/home">
              <ForgotPasswordContent />
            </PreventAuth>
          ),
        },
        {
          path: "/dashboard",
          element: () => (
            <RequireAuth>
              <CreateUserContent />
            </RequireAuth>
          ),
        },
        {
          path: "*",
          element: () => <div>Doesnt match</div>,
        },
      ]}
      navLinks={[
        {
          label: "Home",
          path: "/",
          icon: <HomeIcon />,
        },
        {
          label: "Register",
          path: AUTH_ROUTES.REGISTER,
          icon: <HomeIcon />,
        },
        {
          label: "Login",
          path: AUTH_ROUTES.LOGIN,
          icon: <HomeIcon />,
        },
        {
          label: "Confirm Register",
          path: AUTH_ROUTES.CONFIRM_REGISTER,
          icon: <HomeIcon />,
        },
        {
          label: "Dashboard",
          path: "/dashboard",
          icon: <HomeIcon />,
        },
      ]}
    />
  );
}

export default App;
