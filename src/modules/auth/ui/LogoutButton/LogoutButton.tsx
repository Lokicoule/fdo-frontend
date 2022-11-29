import Button from "@mui/material/Button";
import { useIsLoggedIn } from "../../../../stores/authStore";
import { useFacadeLogout } from "./useFacadeLogout";

export const LogoutButton: React.FC = () => {
  const { onLogout } = useFacadeLogout();
  const isLoggedIn = useIsLoggedIn();

  return isLoggedIn() ? (
    <Button type="button" onClick={onLogout}>
      Sign Out
    </Button>
  ) : null;
};
