import Button from "@mui/material/Button";
import { useAuth } from "auth-context/auth-routing";
import { FC } from "react";

export const LogoutButton: FC = () => {
  const { onLogout, token } = useAuth();

  return token ? (
    <Button type="button" onClick={onLogout}>
      Sign Out
    </Button>
  ) : null;
};
