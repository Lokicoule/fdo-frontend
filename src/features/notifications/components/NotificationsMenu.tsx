import { Notifications } from "@mui/icons-material";
import {
  Tooltip,
  IconButton,
  Badge,
  MenuItem,
  ListItemIcon,
  Avatar,
  ListItemText,
} from "@mui/material";
import { MenuButton } from "../../../components/MenuButton";

export const NotificationsMenu: React.FC = () => {
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
