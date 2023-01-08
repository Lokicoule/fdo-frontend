import MuiDialog, { DialogProps as MuiDialogProps } from "@mui/material/Dialog";
import MuiDialogContent from "@mui/material/DialogContent";
import MuiDialogTitle from "@mui/material/DialogTitle";
import MuiDialogActions from "@mui/material/DialogActions";
import { cloneElement, useEffect, useState } from "react";

export type DialogProps = Omit<MuiDialogProps, "children"> & {
  triggerButton: React.ReactElement;
  children: (props: {
    isOpen: boolean;
    handleClose: () => void;
  }) => React.ReactNode;
  onClose?: () => void;
  isDone?: boolean;
};

export const DialogTitle = MuiDialogTitle;
export const DialogContent = MuiDialogContent;
export const DialogActions = MuiDialogActions;

export const Dialog: React.FunctionComponent<DialogProps> = (props) => {
  const { children, isDone, onClose, triggerButton, ...others } = props;
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    onClose && onClose();
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    if (isDone) {
      handleClose();
    }
  }, [isDone]);

  const trigger = cloneElement(triggerButton, {
    onClick: handleOpen,
  });

  return (
    <>
      {trigger}
      {isOpen && (
        <MuiDialog {...others} open={isOpen} onClose={handleClose}>
          {children({ isOpen, handleClose })}
        </MuiDialog>
      )}
    </>
  );
};
