import React from "react";
import { AppShell } from "ui";
import HomeIcon from "@mui/icons-material/Home";
import SignUp from "./views/Register/RegisterView";
import ConfirmSignUp from "./views/ConfirmRegister/ConfirmRegisterView";
import SignIn from "./views/Login/LoginView";
import { RequireAuth, PreventAuth } from "auth-routing";
import { LogoutButton } from "auth-ui";

function App() {
  return (
    <AppShell
      title="Fruits d'orient"
      colorScheme="dark"
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
          path: "/register",
          element: () => (
            <PreventAuth redirectTo="/home">
              <SignUp />
            </PreventAuth>
          ),
        },
        {
          path: "/confirm-register",
          element: () => (
            <PreventAuth redirectTo="/home">
              <ConfirmSignUp />
            </PreventAuth>
          ),
        },
        {
          path: "/login",
          element: () => (
            <PreventAuth redirectTo="/home">
              <SignIn />
            </PreventAuth>
          ),
        },
        {
          path: "/reset-password",
          element: () => (
            <PreventAuth redirectTo="/home">
              <SignUp />
            </PreventAuth>
          ),
        },
        {
          path: "/dashboard",
          element: () => (
            <RequireAuth>
              <SignUp />
            </RequireAuth>
          ),
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
