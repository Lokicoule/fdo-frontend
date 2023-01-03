import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SettingsIcon from "@mui/icons-material/Settings";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Menu from "~/components/Elements/Menu";

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
    <Menu
      renderToggle={({ onClick }) => (
        <Tooltip title={info}>
          <IconButton onClick={onClick}>
            <Avatar alt={info} />
          </IconButton>
        </Tooltip>
      )}
    >
      {isLoggedIn() ? (
        <Menu.List>
          <Menu.Item>
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Settings</Typography>
          </Menu.Item>
          <Menu.Item onClick={onLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Logout</Typography>
          </Menu.Item>
        </Menu.List>
      ) : (
        <Menu.List>
          <Menu.LinkItem to={AUTH_ROUTES.LOGIN}>
            <ListItemIcon>
              <LoginIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Login</Typography>
          </Menu.LinkItem>
          <Menu.LinkItem to={AUTH_ROUTES.REGISTER}>
            <ListItemIcon>
              <PersonAddIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Register</Typography>
          </Menu.LinkItem>
        </Menu.List>
      )}
    </Menu>
  );
};
