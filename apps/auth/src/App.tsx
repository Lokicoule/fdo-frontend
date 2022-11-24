import HomeIcon from "@mui/icons-material/Home";
import { PreventAuth, RequireAuth } from "auth-routing";
import { AppShell } from "ui";
import LogoutButton from "./components/LogoutButton";
import ConfirmRegisterContent from "./views/ConfirmRegisterContent";
import ForgotPasswordContent from "./views/ForgotPasswordContent";
import LoginContent from "./views/LoginContent";
import RegisterContent from "./views/RegisterContent";
import ResetPasswordContent from "./views/ResetPasswordContent";
import { useAuth } from "auth-provider";

function App() {
  const { paths } = useAuth();
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
          path: paths.REGISTER_PATH,
          element: () => (
            <PreventAuth redirectTo="/home">
              <RegisterContent />
            </PreventAuth>
          ),
        },
        {
          path: paths.CONFIRM_REGISTER_PATH,
          element: () => (
            <PreventAuth redirectTo="/home">
              <ConfirmRegisterContent />
            </PreventAuth>
          ),
        },
        {
          path: paths.LOGIN_PATH,
          element: () => (
            <PreventAuth redirectTo="/home">
              <LoginContent />
            </PreventAuth>
          ),
        },
        {
          path: paths.RESET_PASSWORD_PATH,
          element: () => (
            <PreventAuth redirectTo="/home">
              <ResetPasswordContent />
            </PreventAuth>
          ),
        },
        {
          path: paths.FORGOT_PASSWORD_PATH,
          element: () => (
            <PreventAuth redirectTo="/home">
              <ForgotPasswordContent />
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
      ]}
      navLinks={[
        {
          label: "Home",
          path: "/",
          icon: <HomeIcon />,
        },
        {
          label: "Login",
          path: paths.LOGIN_PATH,
          icon: <HomeIcon />,
        },
        {
          label: "Register",
          path: paths.REGISTER_PATH,
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
