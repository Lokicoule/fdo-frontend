import { useNotifications } from "~/stores/notifications";
import { Notification } from "./Notification";

export const Notifications = () => {
  const { notifications, dismissNotification } = useNotifications();

  return (
    <div>
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          notification={notification}
          onDismiss={() => dismissNotification(notification.id)}
        />
      ))}
    </div>
  );
};
