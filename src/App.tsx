import { lazy } from "react";

import HomeIcon from "@mui/icons-material/Home";

import { Loadable } from "~/components/Loadable";
import { AUTH_ROUTES } from "~/features/authentication/constants/auth-routes.constants";
import { ThemeMenu } from "~/features/preferences/components/ThemeMenu";
import { ProfileMenu } from "~/features/profile/components/ProfileMenu";
import { SearchMenu } from "~/features/search/components/SearchMenu";
import { RequireUserGroup } from "~/features/user/components/RequireUserGroup";
import { AppShell } from "~/layouts/AppShell";
import { ConfirmRegisterPage } from "~/pages/ConfirmRegisterPage";
import { ForgotPasswordPage } from "~/pages/ForgotPasswordPage";
import { LoginPage } from "~/pages/LoginPage";
import { RegisterPage } from "~/pages/RegisterPage";
import { ResetPasswordPage } from "~/pages/ResetPasswordPage";
import "./App.css";

const Error403Page = Loadable(
  lazy(() =>
    import("~/pages/errors/Error403Page").then((module) => ({
      default: module.Error403Page,
    }))
  )
);

const Error404Page = Loadable(
  lazy(() =>
    import("~/pages/errors/Error404Page").then((module) => ({
      default: module.Error404Page,
    }))
  )
);

const Error500Page = Loadable(
  lazy(() =>
    import("~/pages/errors/Error500Page").then((module) => ({
      default: module.Error500Page,
    }))
  )
);

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
      element: Error403Page,
    },
    {
      path: "*",
      element: Error404Page,
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
      failover={<Error500Page />}
    />
  );
}

export default App;
