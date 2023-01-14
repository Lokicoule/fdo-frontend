import CloseIcon from "@mui/icons-material/Close";
import { Alert, AlertColor, AlertTitle, Snackbar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Slide, { SlideProps } from "@mui/material/Slide";
import { ProgressBar } from "~/components/Elements/ProgressBar";

type NotificationProps = {
  notification: {
    type: AlertColor;
    title: string;
    message?: string;
  };
  onDismiss: () => void;
};

const Transition: React.FunctionComponent<Omit<SlideProps, "direction">> = (
  props
) => {
  return <Slide {...props} direction="left" />;
};

const autoHideDuration = 6000;
const duration = autoHideDuration - 100;

export const Notification: React.FunctionComponent<NotificationProps> = (
  props
) => {
  const { notification, onDismiss } = props;

  return (
    <Snackbar
      open={true}
      autoHideDuration={autoHideDuration}
      onClose={onDismiss}
      TransitionComponent={Transition}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <Alert
        elevation={3}
        variant="filled"
        severity={notification.type}
        sx={{ width: "100%" }}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={onDismiss}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
        onClose={onDismiss}
      >
        <AlertTitle
          sx={{
            fontSize: "1.2rem",
          }}
        >
          <strong>{notification.title}</strong>
        </AlertTitle>
        {notification?.message}
        <ProgressBar color={notification.type} duration={duration} />
      </Alert>
    </Snackbar>
  );
};
