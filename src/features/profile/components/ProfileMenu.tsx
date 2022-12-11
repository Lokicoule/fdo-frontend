import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SettingsIcon from "@mui/icons-material/Settings";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import { MenuButton } from "~/components/MenuButton";
import {
  AUTH_ROUTES,
  useAuthService,
  useEmail,
  useIsLoggedIn,
} from "~/features/authentication";

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
