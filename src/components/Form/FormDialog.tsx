import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { cloneElement, useEffect, useState } from "react";

type FormDialogProps = {
  isDone: boolean;
  title: React.ReactElement | string;
  submitButton: React.ReactElement;
  triggerButton: React.ReactElement;
  onClose?: () => void;
};

export const FormDialog: React.FunctionComponent<
  React.PropsWithChildren<FormDialogProps>
> = (props) => {
  const { isDone, onClose, title, submitButton, triggerButton, children } =
    props;
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    onClose && onClose();
  };

  useEffect(() => {
    if (isDone) {
      handleClose();
    }
  }, [isDone]);

  return (
    <>
      {cloneElement(triggerButton, {
        onClick: () => {
          setOpen(true);
        },
      })}
      <Dialog
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          p: 2,
        }}
        maxWidth="sm"
        open={open}
        onClose={handleClose}
      >
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
            <Button onClick={handleClose}>Cancel</Button>
            {submitButton}
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  );
};
