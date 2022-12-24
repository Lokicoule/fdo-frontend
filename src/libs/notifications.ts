import { toast, ToastOptions } from "react-toastify";

const defaultOptions = {
  position: "bottom-left",
  autoClose: 5000,
  pauseOnHover: true,
  draggable: true,
} as ToastOptions;

export const notify = {
  success: (message: string) => toast.success(message, defaultOptions),
  error: (message: string) => toast.error(message, defaultOptions),
  warning: (message: string) => toast.warning(message, defaultOptions),
  info: (message: string) => toast.info(message, defaultOptions),
};
