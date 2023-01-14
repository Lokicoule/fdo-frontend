import { useDisclosure } from "~/hooks/useDisclosure";
import { Alert, AlertTitle, Button } from "@mui/material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogProps,
} from "./Dialog";
import { cloneElement } from "react";

export type ConfirmationDialogProps = Omit<DialogProps, "children"> & {
  confirmButton: React.ReactElement;
  title: string;
  body?: React.ReactElement;
  cancelButtonText?: string;
};

export const ConfirmationDialog: React.FunctionComponent<
  ConfirmationDialogProps
> = (props) => {
  const {
    confirmButton,
    title,
    body = "",
    cancelButtonText = "Cancel",
    ...others
  } = props;

  return (
    <Dialog
      {...others}
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
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>{body}</DialogContent>
          <DialogActions
            sx={{
              width: "100%",
              p: 2,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Button onClick={onClose}>{cancelButtonText}</Button>
            {confirmButton}
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};
