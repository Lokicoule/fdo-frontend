import {
  PersonAdd as PersonAddIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Login as LoginIcon,
} from "@mui/icons-material";
import {
  Tooltip,
  IconButton,
  Avatar,
  MenuItem,
  ListItemIcon,
  Typography,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import { MenuButton } from "../../../components/MenuButton";
import { useEmail, useIsLoggedIn } from "../../authentication";
import { useAuthService } from "../../authentication/hooks/useAuthService";

export const ProfileMenu: React.FunctionComponent = () => {
  const { onLogout } = useAuthService();
  const isLoggedIn = useIsLoggedIn();
  const email = useEmail();

  const info = isLoggedIn() ? (email ? email : "Unknown") : "Not logged in";

  return (
    <MenuButton
      renderButton={({ onClick }) => (
        <Tooltip title={info}>
          <IconButton onClick={onClick}>
            <Avatar alt={info} />
          </IconButton>
        </Tooltip>
      )}
      renderMenu={({ onClose }) => {
        return isLoggedIn()
          ? [
              <MenuItem onClick={onClose} key="add-account">
                <ListItemIcon>
                  <PersonAddIcon fontSize="small" />
                </ListItemIcon>
                <Typography variant="inherit">Add Account</Typography>
              </MenuItem>,
              <MenuItem onClick={onClose} key="settings">
                <ListItemIcon>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                <Typography variant="inherit">Settings</Typography>
              </MenuItem>,
              <Divider key="divider" />,
              <MenuItem onClick={onLogout} key="logout">
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <Typography variant="inherit">Logout</Typography>
              </MenuItem>,
            ]
          : [
              <MenuItem LinkComponent={Link} href="login" key="login">
                <ListItemIcon>
                  <LoginIcon fontSize="small" />
                </ListItemIcon>
                <Typography variant="inherit">Login</Typography>
              </MenuItem>,
              <MenuItem LinkComponent={Link} href="register" key="register">
                <ListItemIcon>
                  <PersonAddIcon fontSize="small" />
                </ListItemIcon>
                <Typography variant="inherit">Register</Typography>
              </MenuItem>,
            ];
      }}
    />
  );
};
