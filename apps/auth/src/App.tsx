import HomeIcon from "@mui/icons-material/Home";
import { PreventAuth, RequireAuth } from "auth-routing";
import { AppShell } from "ui";
import LogoutButton from "./components/LogoutButton";
import ConfirmRegisterContent from "./views/ConfirmRegisterContent";
import LoginContent from "./views/LoginContent";
import RegisterContent from "./views/RegisterContent";

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
          path: "/dashboard",
          element: () => (
            <RequireAuth>
              <div>Home</div>
            </RequireAuth>
          ),
        },
        {
          path: "/register",
          element: () => (
            <PreventAuth redirectTo="/home">
              <RegisterContent />
            </PreventAuth>
          ),
        },
        {
          path: "/confirm-register",
          element: () => (
            <PreventAuth redirectTo="/home">
              <ConfirmRegisterContent />
            </PreventAuth>
          ),
        },
        {
          path: "/login",
          element: () => (
            <PreventAuth redirectTo="/home">
              <LoginContent />
            </PreventAuth>
          ),
        },
        {
          path: "/reset-password",
          element: () => (
            <PreventAuth redirectTo="/home">
              <RegisterContent />
            </PreventAuth>
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
          label: "Login",
          path: "/login",
          icon: <HomeIcon />,
        },
        {
          label: "Register",
          path: "/register",
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
