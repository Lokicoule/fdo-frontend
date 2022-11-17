import React from "react";
import { AppShell } from "ui";
import HomeIcon from "@mui/icons-material/Home";
import SignUp from "./views/SignUp/SignUpContent";

function App() {
  return (
    <AppShell
      title="Auth"
      colorScheme="dark"
      routes={[
        {
          path: "/",
          element: () => <div>Home</div>,
        },
        {
          path: "/auth/sign-up",
          element: SignUp,
        },
        {
          path: "/auth/confirm-sign-up",
          element: SignUp,
        },
        {
          path: "/auth/sign-in",
          element: SignUp,
        },
        {
          path: "/auth/forgot-password",
          element: SignUp,
        },
      ]}
      navLinks={[
        {
          label: "Home",
          path: "/",
          icon: <HomeIcon />,
        },
        {
          label: "Sign Up",
          path: "/auth/sign-up",
          icon: <HomeIcon />,
        },
        {
          label: "Sign In",
          path: "/auth/sign-up",
          icon: <HomeIcon />,
        },
        {
          label: "Confirm Sign Up",
          path: "/auth/confirm-sign-up",
          icon: <HomeIcon />,
        },
      ]}
    />
  );
}

export default App;
