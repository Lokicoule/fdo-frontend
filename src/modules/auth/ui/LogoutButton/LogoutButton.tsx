import Button from "@mui/material/Button";
import { useIsLoggedIn } from "../../../../stores/authStore";
import { useAuth } from "../../context/AuthContext";

export const LogoutButton: React.FC = () => {
  const { onLogout } = useAuth();
  const isLoggedIn = useIsLoggedIn();

  return isLoggedIn() ? (
    <Button type="button" onClick={onLogout}>
      Sign Out
    </Button>
  ) : null;
};
