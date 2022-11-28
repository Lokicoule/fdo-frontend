import Button from "@mui/material/Button";
import { useAuth, useIsLoggedIn } from "auth-provider";
import { FC } from "react";

export const LogoutButton: FC = () => {
  const {
    logout: { onLogout, error },
  } = useAuth();
  const isLoggedIn = useIsLoggedIn();

  return isLoggedIn() ? (
    <Button type="button" onClick={onLogout}>
      Sign Out
    </Button>
  ) : null;
};
