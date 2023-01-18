import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SettingsIcon from "@mui/icons-material/Settings";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { Menu } from "~/components/Elements/Menuv2";
import { useAuth } from "~/providers/auth";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { Stack, useMediaQuery, useTheme } from "@mui/material";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

export const ProfileMenu = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const menuItems = useMemo(
    () => [
      {
        label: "Logout",
        icon: <LogoutIcon />,
        onClick: logout,
      },
    ],
    [logout]
  );

  return (
    <Menu
      triggerButton={
        <Tooltip title={"Profile"}>
          <IconButton
            color="inherit"
            size="medium"
            /* sx={{
              borderRadius: 2,
              border: (theme) => `1px solid RGBA(255,255,255,0.3)`,
            }} */
          >
            <AccountCircleOutlinedIcon />
          </IconButton>
        </Tooltip>
      }
    >
      {() => (
        <Stack spacing={1} sx={{ p: 1 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Avatar>{user?.email?.charAt(0)}</Avatar>
            <Typography variant="subtitle1">{user?.email}</Typography>
          </Stack>
          <Divider />
          {menuItems.map((item) => (
            <MenuItem key={item.label} onClick={item.onClick}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <Typography variant="subtitle1">{item.label}</Typography>
            </MenuItem>
          ))}
        </Stack>
      )}
    </Menu>
  );
};
