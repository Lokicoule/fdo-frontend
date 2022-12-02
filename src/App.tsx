import HomeIcon from "@mui/icons-material/Home";
import "./App.css";
import { RequireAuth } from "./features/authentication/components";
import { AUTH_ROUTES } from "./features/authentication/constants/auth-routes.constants";
import { ThemeMenu } from "./features/preferences/components/ThemeMenu";
import { ProfileMenu } from "./features/profile/components/ProfileMenu";
import { SearchMenu } from "./features/search/components/SearchMenu";
import { CreateUserContent } from "./features/users/components/CreateUserContent";
import { AppShell } from "./layouts/AppShell";
import { ConfirmRegisterPage } from "./pages/ConfirmRegisterPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ResetPasswordPage } from "./pages/ResetPasswordPage";

function App() {
  return (
    <AppShell
      title="Fruits d'orient home"
      menuButtons={[
        {
          key: "search_menu",
          element: <SearchMenu />,
        },
        {
          key: "theme_menu",
          element: <ThemeMenu />,
        },
        {
          key: "profile_menu",
          element: <ProfileMenu />,
        },
      ]}
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
          element: RegisterPage,
        },
        {
          path: AUTH_ROUTES.CONFIRM_REGISTER,
          element: ConfirmRegisterPage,
        },
        {
          path: AUTH_ROUTES.LOGIN,
          element: LoginPage,
        },
        {
          path: AUTH_ROUTES.RESET_PASSWORD,
          element: ResetPasswordPage,
        },
        {
          path: AUTH_ROUTES.FORGOT_PASSWORD,
          element: ForgotPasswordPage,
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
