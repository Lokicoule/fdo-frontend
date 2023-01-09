import { useNotificationStore, Notification } from "~/stores/notifications";

export const notify = {
  success: (notification: Omit<Notification, "id" | "type">) =>
    useNotificationStore.getState().addNotification({
      type: "success",
      ...notification,
    }),
  info: (notification: Omit<Notification, "id" | "type">) =>
    useNotificationStore
      .getState()
      .addNotification({ type: "info", ...notification }),
  warning: (notification: Omit<Notification, "id" | "type">) =>
    useNotificationStore.getState().addNotification({
      type: "warning",
      ...notification,
    }),
  error: (notification: Omit<Notification, "id" | "type">) =>
    useNotificationStore
      .getState()
      .addNotification({ type: "error", ...notification }),
};
