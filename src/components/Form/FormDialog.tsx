import { Button, Stack } from "@mui/material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "~/components/Elements/Dialog";

export type FormDialogProps = {
  isDone: boolean;
  title: React.ReactElement | string;
  submitButton: React.ReactElement;
  triggerButton: React.ReactElement;
  onClose?: () => void;
  children: (props: { isOpen: boolean }) => React.ReactNode;
};

export const FormDialog: React.FunctionComponent<FormDialogProps> = (props) => {
  const { isDone, onClose, title, submitButton, triggerButton, children } =
    props;

  return (
    <Dialog
      triggerButton={triggerButton}
      onClose={onClose}
      isDone={isDone}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        p: 2,
      }}
      maxWidth="sm"
      open={true}
    >
      {({ isOpen, handleClose }) => (
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
          <DialogContent>{children({ isOpen })}</DialogContent>
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
              <Button onClick={handleClose}>Cancel</Button>
              {submitButton}
            </Stack>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};
