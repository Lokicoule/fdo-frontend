import Button from "@mui/material/Button";
import { useAuth } from "auth-provider";
import { FC } from "react";

export const LogoutButton: FC = () => {
  const { onLogout, token } = useAuth();

  return Boolean(token) ? (
    <Button type="button" onClick={onLogout}>
      Sign Out
    </Button>
  ) : null;
};
