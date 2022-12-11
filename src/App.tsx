import HomeIcon from "@mui/icons-material/Home";
import "./App.css";
import { PreventAuth } from "./features/authentication";
import { AUTH_ROUTES } from "./features/authentication/constants/auth-routes.constants";
import { ThemeMenu } from "./features/preferences/components/ThemeMenu";
import { ProfileMenu } from "./features/profile/components/ProfileMenu";
import { SearchMenu } from "./features/search/components/SearchMenu";
import { RequireUserGroup } from "./features/user/components/RequireUserGroup";
import { AppShell } from "./layouts/AppShell";
import { ConfirmRegisterPage } from "./pages/ConfirmRegisterPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ResetPasswordPage } from "./pages/ResetPasswordPage";
import { lazyLoad } from "./libs/lazy-load";
import { Suspense } from "react";
import { Error403Page } from "./pages/Error403Page";

function getMenus() {
  return [
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
  ];
}

function getRoutes() {
  return [
    {
      path: "/",
      element: () => (
        <RequireUserGroup>
          <div>Home</div>
        </RequireUserGroup>
      ),
    },
    {
      path: "/home",
      element: () => (
        <RequireUserGroup>
          <div>Home</div>
        </RequireUserGroup>
      ),
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
      path: "/403",
      element: () => (
        <Suspense fallback={<div>Loading...</div>}>
          <Error403Page />
        </Suspense>
      ),
    },
    {
      path: "*",
      element: () => <div>Not found</div>,
    },
  ];
}

function getNavLinks() {
  return [
    {
      label: "Home",

      path: "/",
      icon: <HomeIcon />,
    },
    {
      label: "Products",
      path: "/products",
      icon: <HomeIcon />,
    },
  ];
}

function App() {
  return (
    <AppShell
      title="Fruits d'orient"
      menuButtons={getMenus()}
      routes={getRoutes()}
      navLinks={getNavLinks()}
    />
  );
}

export default App;
