import CloseIcon from "@mui/icons-material/Close";
import { Alert, AlertColor, AlertTitle, Snackbar, styled } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Slide, { SlideProps } from "@mui/material/Slide";

type TransitionProps = Omit<SlideProps, "direction">;

const Transition: React.FunctionComponent<TransitionProps> = (
  props: TransitionProps
) => {
  return <Slide {...props} direction="left" />;
};

const StyledSnackbar = styled(Snackbar)(({ theme }) => ({
  ".MuiSnackbarContent-root": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

type NotificationProps = {
  notification: {
    type: AlertColor;
    title: string;
    message?: string;
  };
  onDismiss: () => void;
};

export const Notification: React.FunctionComponent<NotificationProps> = (
  props
) => {
  const { notification, onDismiss } = props;

  return (
    <StyledSnackbar
      open={true}
      autoHideDuration={6000}
      onClose={onDismiss}
      TransitionComponent={Transition}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <Alert
        elevation={6}
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
      </Alert>
    </StyledSnackbar>
  );
};
