import Button from "@mui/material/Button";
import { useIsLoggedIn } from "../../stores/authStore";
import { useFacadeLogout } from "../../hooks/useFacadeLogout";

export const LogoutButton: React.FC = () => {
  const { onLogout } = useFacadeLogout();
  const isLoggedIn = useIsLoggedIn();
  return isLoggedIn() ? (
    <Button color={"error"} type="button" onClick={onLogout}>
      Sign Out
    </Button>
  ) : null;
};

export default LogoutButton;
