import Button from "@mui/material/Button";
import { useAuth } from "auth-provider";
import { FC } from "react";
import { useStore } from "store";

export const LogoutButton: FC = () => {
  const { onLogout } = useAuth();
  const { token } = useStore();
  console.log("token", token);
  return token ? (
    <Button type="button" onClick={onLogout}>
      Sign Out
    </Button>
  ) : null;
};
