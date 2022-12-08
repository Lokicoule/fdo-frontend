import {
  Login as LoginIcon,
  Logout as LogoutIcon,
  PersonAdd as PersonAddIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import {
  Avatar,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { MenuButton } from "../../../components/MenuButton";
import { AUTH_ROUTES, useEmail, useIsLoggedIn } from "../../authentication";
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
      renderMenu={({ onClose, LinkComponent }) => {
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
              <MenuItem key="login">
                <LinkComponent to={AUTH_ROUTES.LOGIN}>
                  <ListItemIcon>
                    <LoginIcon fontSize="small" />
                  </ListItemIcon>
                  <Typography variant="inherit">Login</Typography>
                </LinkComponent>
              </MenuItem>,
              <MenuItem onClick={onClose} key="register">
                <LinkComponent to={AUTH_ROUTES.REGISTER}>
                  <ListItemIcon>
                    <PersonAddIcon fontSize="small" />
                  </ListItemIcon>
                  <Typography variant="inherit">Register</Typography>
                </LinkComponent>
              </MenuItem>,
            ];
      }}
    />
  );
};
