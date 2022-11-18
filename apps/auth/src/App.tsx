import React from "react";
import { AppShell } from "ui";
import HomeIcon from "@mui/icons-material/Home";
import SignUp from "./views/SignUp/SignUpContent";
import ConfirmSignUp from "./views/ConfirmSignUp/ConfirmSignUpContent";
import SignIn from "./views/SignIn/SignInContent";
import { RequireAuth, PreventAuth } from "auth-context/auth-routing";
import { LogoutButton } from "../../../packages/auth-ui/auth-content";

function App() {
  return (
    <AppShell
      title="Auth"
      colorScheme="dark"
      render={<LogoutButton />}
      routes={[
        {
          path: "/",
          element: () => <div>Home</div>,
        },
        {
          path: "/register",
          element: () => (
            <PreventAuth>
              <SignUp />
            </PreventAuth>
          ),
        },
        {
          path: "/confirm-register",
          element: () => (
            <PreventAuth>
              <ConfirmSignUp />
            </PreventAuth>
          ),
        },
        {
          path: "/login",
          element: () => (
            <PreventAuth>
              <SignIn />
            </PreventAuth>
          ),
        },
        {
          path: "/reset-password",
          element: () => (
            <PreventAuth>
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
