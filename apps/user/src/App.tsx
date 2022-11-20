import HomeIcon from "@mui/icons-material/Home";
import { PreventAuth, RequireAuth } from "auth-routing";
import { ConfirmSignUp, LogoutButton, SignIn, SignUp } from "auth-ui";
import { AppShell } from "ui";
import { User } from "./views/User";
import { useStore } from "store";

function App() {
  const { token, setToken } = useStore();
  return (
    <AppShell
      title="Fruits d'orient"
      colorScheme="dark"
      render={<LogoutButton />}
      routes={[
        {
          path: "/",
          element: () => (
            <div>
              Home User
              <button onClick={() => setToken("test")}>test</button>
            </div>
          ),
        },
        {
          path: "/user",
          element: () => (
            <RequireAuth>
              <User />
            </RequireAuth>
          ),
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
      ]}
      navLinks={[
        {
          label: "Home",
          path: "/",
          icon: <HomeIcon />,
        },
        {
          label: "User",
          path: "/user",
          icon: <HomeIcon />,
        },
      ]}
    />
  );
}

export default App;
