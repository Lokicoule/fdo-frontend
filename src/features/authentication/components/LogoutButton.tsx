import Button from "@mui/material/Button";
import { useIsLoggedIn } from "../stores/authStore";
import { useAuthService } from "../hooks/useAuthService";

export const LogoutButton: React.FC = () => {
  const { onLogout } = useAuthService();
  const isLoggedIn = useIsLoggedIn();

  return isLoggedIn() ? (
    <Button variant="outlined" color="inherit" type="button" onClick={onLogout}>
      Sign Out
    </Button>
  ) : null;
};
