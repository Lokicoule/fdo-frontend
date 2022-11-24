import HomeIcon from "@mui/icons-material/Home";
import { useAuth } from "auth-provider";
import { PreventAuth, RequireAuth } from "auth-routing";
import {
  ConfirmRegisterContent,
  ForgotPasswordContent,
  LoginContent,
  LogoutButton,
  RegisterContent,
  ResetPasswordContent,
} from "auth-ui";
import React from "react";
import { AppShell, BundleLoader, ErrorBoundary } from "ui";

const LogoutButtonRuntime = React.lazy(() => import("auth/LogoutButton"));
const ConfirmRegisterRuntime = React.lazy(() => import("auth/ConfirmRegister"));
const LoginRuntime = React.lazy(() => import("auth/Login"));
const RegisterRuntime = React.lazy(() => import("auth/Register"));
const ResetPasswordRuntime = React.lazy(() => import("auth/ResetPassword"));
const ForgotPasswordRuntime = React.lazy(() => import("auth/ForgotPassword"));

function App() {
  const { paths } = useAuth();

  return (
    <AppShell
      title="Fruits d'orient home"
      colorScheme="dark"
      render={
        <ErrorBoundary failover={<LogoutButton />}>
          <React.Suspense fallback={<BundleLoader />}>
            <LogoutButtonRuntime />
          </React.Suspense>
        </ErrorBoundary>
      }
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
          path: paths.REGISTER_PATH,
          element: () => (
            <PreventAuth redirectTo="/home">
              <ErrorBoundary failover={<RegisterContent />}>
                <React.Suspense fallback={<BundleLoader />}>
                  <RegisterRuntime />
                </React.Suspense>
              </ErrorBoundary>
            </PreventAuth>
          ),
        },
        {
          path: paths.CONFIRM_REGISTER_PATH,
          element: () => (
            <PreventAuth redirectTo="/home">
              <ErrorBoundary failover={<ConfirmRegisterContent />}>
                <React.Suspense fallback={<BundleLoader />}>
                  <ConfirmRegisterRuntime />
                </React.Suspense>
              </ErrorBoundary>
            </PreventAuth>
          ),
        },
        {
          path: paths.LOGIN_PATH,
          element: () => (
            <PreventAuth redirectTo="/home">
              <ErrorBoundary failover={<LoginContent />}>
                <React.Suspense fallback={<BundleLoader />}>
                  <LoginRuntime />
                </React.Suspense>
              </ErrorBoundary>
            </PreventAuth>
          ),
        },
        {
          path: paths.RESET_PASSWORD_PATH,
          element: () => (
            <PreventAuth redirectTo="/home">
              <ErrorBoundary failover={<ResetPasswordContent />}>
                <React.Suspense fallback={<BundleLoader />}>
                  <ResetPasswordRuntime />
                </React.Suspense>
              </ErrorBoundary>
            </PreventAuth>
          ),
        },
        {
          path: paths.FORGOT_PASSWORD_PATH,
          element: () => (
            <PreventAuth redirectTo="/home">
              <ErrorBoundary failover={<ForgotPasswordContent />}>
                <React.Suspense fallback={<BundleLoader />}>
                  <ForgotPasswordRuntime />
                </React.Suspense>
              </ErrorBoundary>
            </PreventAuth>
          ),
        },
        {
          path: "/dashboard",
          element: () => (
            <RequireAuth>
              <div>Dashboard</div>
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
          path: paths.REGISTER_PATH,
          icon: <HomeIcon />,
        },
        {
          label: "Login",
          path: paths.LOGIN_PATH,
          icon: <HomeIcon />,
        },
        {
          label: "Confirm Register",
          path: paths.CONFIRM_REGISTER_PATH,
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
