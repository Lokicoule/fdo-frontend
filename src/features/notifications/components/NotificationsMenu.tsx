/* import Notifications from "@mui/icons-material/Notifications";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";

import { MenuButton } from "~/components/MenuButton";

export const NotificationsMenu: React.FunctionComponent = () => {
  const notifications = [
    {
      id: 1,
      title: "New user registered",
      description: "1 hour ago",
      avatar: "https://i.pravatar.cc/300",
    },
    {
      id: 2,
      title: "New order received",
      description: "2 hours ago",
      avatar: "https://i.pravatar.cc/300",
    },
  ];

  return (
    <MenuButton
      renderButton={({ onClick }) => (
        <Tooltip title="Notifications">
          <IconButton onClick={onClick}>
            <Badge badgeContent={notifications.length} color="error">
              <Notifications fontSize="small" />
            </Badge>
          </IconButton>
        </Tooltip>
      )}
      renderMenu={({ onClose }) =>
        notifications.map((notification) => (
          <MenuItem key={notification.id} onClick={onClose}>
            <ListItemIcon>
              <Avatar alt={notification.title} src={notification.avatar} />
            </ListItemIcon>
            <ListItemText
              primary={notification.title}
              secondary={notification.description}
            />
          </MenuItem>
        ))
      }
    />
  );
};
 */
