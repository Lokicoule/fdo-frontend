import MuiDialog, { DialogProps as MuiDialogProps } from "@mui/material/Dialog";
import MuiDialogActions from "@mui/material/DialogActions";
import MuiDialogContent from "@mui/material/DialogContent";
import MuiDialogTitle from "@mui/material/DialogTitle";
import { cloneElement, useEffect, useState } from "react";
import { preventRenderingIf } from "~/utils/render";

export type DialogProps = Omit<MuiDialogProps, "children"> & {
  triggerButton: React.ReactElement;
  children: (props: { onClose: () => void }) => React.ReactNode;
  isDone?: boolean;
  onClose?: () => void;
};

export const DialogTitle = MuiDialogTitle;
export const DialogContent = MuiDialogContent;
export const DialogActions = MuiDialogActions;

export const Dialog: React.FunctionComponent<DialogProps> = (props) => {
  const { children, isDone, triggerButton, onClose, ...others } = props;
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
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
      {preventRenderingIf(isOpen).render(
        <MuiDialog {...others} open={isOpen} onClose={handleClose}>
          {children({ onClose: handleClose })}
        </MuiDialog>
      )}
    </>
  );
};
