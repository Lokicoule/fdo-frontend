import "./libs/i18n/config"; //TODO check bootstraped after imports

import { lazy, Suspense } from "react";

import HomeIcon from "@mui/icons-material/Home";

import { Loadable } from "~/components/Loadable";
import { AUTH_ROUTES } from "~/features/authentication/constants/auth-routes.constants";
import { ThemeMenu } from "~/features/preferences/components/ThemeMenu";
import { ProfileMenu } from "~/features/profile/components/ProfileMenu";
import { RequireUserGroup } from "~/features/user/components/RequireUserGroup";
import { ConfirmRegisterPage } from "~/pages/ConfirmRegisterPage";
import { ForgotPasswordPage } from "~/pages/ForgotPasswordPage";
import { LoginPage } from "~/pages/LoginPage";
import { RegisterPage } from "~/pages/RegisterPage";
import { ResetPasswordPage } from "~/pages/ResetPasswordPage";
import { ProductsContent } from "~/features/product/components";
import "./App.css";
import { LanguageMenu } from "./features/preferences/components/LanguageMenu";
import { Loading } from "./layouts/AppShell/components/Loading";

const AppShell = lazy(() =>
  import("./layouts/AppShell").then((module) => ({ default: module.AppShell }))
);

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
      key: "language_menu",
      element: <LanguageMenu />,
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
      path: "/products",
      element: ProductsContent,
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
    <Suspense fallback={<Loading />}>
      <AppShell
        title="Fruits d'orient"
        menuButtons={getMenus()}
        routes={getRoutes()}
        navLinks={getNavLinks()}
        failover={<Error500Page />}
      />
    </Suspense>
  );
}

export default App;
