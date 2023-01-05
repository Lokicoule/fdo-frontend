import create from "zustand";
import { nanoid } from "nanoid";

export type Notification = {
  id: string;
  type: "success" | "info" | "warning" | "error";
  title: string;
  message?: string;
};

type NotificationsStore = {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, "id">) => void;
  dismissNotification: (id: string) => void;
};

const useNotificationStore = create<NotificationsStore>((set) => ({
  notifications: [],
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        { id: nanoid(), ...notification },
      ],
    })),
  dismissNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter(
        (notification) => notification.id !== id
      ),
    })),
}));

export const useNotifications = () => {
  const { notifications, addNotification, dismissNotification } =
    useNotificationStore();
  return { notifications, addNotification, dismissNotification };
};

export const useNotify = () => {
  const { addNotification } = useNotificationStore();

  return {
    success: (notification: Omit<Notification, "id" | "type">) =>
      addNotification({ type: "success", ...notification }),
    info: (notification: Omit<Notification, "id" | "type">) =>
      addNotification({ type: "info", ...notification }),
    warning: (notification: Omit<Notification, "id" | "type">) =>
      addNotification({ type: "warning", ...notification }),
    error: (notification: Omit<Notification, "id" | "type">) =>
      addNotification({ type: "error", ...notification }),
  };
};

export const useDismissNotification = () => {
  const { dismissNotification } = useNotificationStore();
  return dismissNotification;
};
