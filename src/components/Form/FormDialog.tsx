import { Button, Stack } from "@mui/material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "~/components/Elements/Dialog";

export type FormDialogProps = React.PropsWithChildren<{
  isDone: boolean;
  title: React.ReactElement | string;
  submitButton: React.ReactElement;
  triggerButton: React.ReactElement;
  onClose?: () => void;
}>;

export const FormDialog: React.FunctionComponent<FormDialogProps> = (props) => {
  const { isDone, title, submitButton, triggerButton, onClose, children } =
    props;

  return (
    <Dialog
      triggerButton={triggerButton}
      isDone={isDone}
      maxWidth="sm"
      onClose={onClose}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        p: 2,
      }}
    >
      {({ onClose }) => (
        <>
          <DialogTitle
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            variant="body1"
            fontSize={"2rem"}
          >
            {title}
          </DialogTitle>
          <DialogContent>{children}</DialogContent>
          <DialogActions>
            <Stack
              sx={{
                width: "100%",
                p: 2,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
              direction="row"
              justifyContent="space-between"
            >
              <Button onClick={onClose}>Cancel</Button>
              {submitButton}
            </Stack>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};
