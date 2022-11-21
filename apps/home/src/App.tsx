import React from "react";
import { AppShell, ErrorBoundary } from "ui";
import HomeIcon from "@mui/icons-material/Home";
import { RequireAuth, PreventAuth } from "auth-routing";

import {
  ConfirmRegisterContent,
  LoginContent,
  RegisterContent,
  LogoutButton,
} from "auth-ui";

const LogoutButtonRuntime = React.lazy(() => import("auth/LogoutButton"));
const ConfirmRegisterRuntime = React.lazy(() => import("auth/ConfirmRegister"));
const LoginRuntime = React.lazy(() => import("auth/Login"));
const RegisterRuntime = React.lazy(() => import("auth/Register"));

function App() {
  return (
    <AppShell
      title="Fruits d'orient home"
      colorScheme="dark"
      render={
        <ErrorBoundary failover={<LogoutButton />}>
          <React.Suspense fallback={<div>Loading...</div>}>
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
          path: "/register",
          element: () => (
            <PreventAuth redirectTo="/home">
              <ErrorBoundary failover={<ConfirmRegisterContent />}>
                <React.Suspense fallback={<div>Loading...</div>}>
                  <RegisterRuntime />
                </React.Suspense>
              </ErrorBoundary>
            </PreventAuth>
          ),
        },
        {
          path: "/confirm-register",
          element: () => (
            <PreventAuth redirectTo="/home">
              <ErrorBoundary failover={<ConfirmRegisterContent />}>
                <React.Suspense fallback={<div>Loading...</div>}>
                  <ConfirmRegisterRuntime />
                </React.Suspense>
              </ErrorBoundary>
            </PreventAuth>
          ),
        },
        {
          path: "/login",
          element: () => (
            <PreventAuth redirectTo="/home">
              <ErrorBoundary failover={<LoginContent />}>
                <React.Suspense fallback={<div>Loading...</div>}>
                  <LoginRuntime />
                </React.Suspense>
              </ErrorBoundary>
            </PreventAuth>
          ),
        },
        {
          path: "/reset-password",
          element: () => (
            <PreventAuth redirectTo="/home">
              <ErrorBoundary failover={<RegisterContent />}>
                <React.Suspense fallback={<div>Loading...</div>}>
                  <RegisterRuntime />
                </React.Suspense>
              </ErrorBoundary>
            </PreventAuth>
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
          path: "/register",
          icon: <HomeIcon />,
        },
        {
          label: "Login",
          path: "/login",
          icon: <HomeIcon />,
        },
        {
          label: "Confirm Register",
          path: "/confirm-register",
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
