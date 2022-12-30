import { PropsWithChildren, useState } from "react";

import MuiDialog, { DialogProps as MuiDialogProps } from "@mui/material/Dialog";
import { DialogActions, DialogContent, DialogTitle } from "@mui/material";

export type DialogProps = PropsWithChildren<Omit<MuiDialogProps, "open">>;

export type ModalProps = PropsWithChildren<
  DialogProps & {
    isOpen: boolean;
    onClosed: () => void;
  }
>;

const ModalBase = ({ isOpen, onClosed, children, ...props }: ModalProps) => {
  console.info("ModalBase render");

  return (
    <MuiDialog open={isOpen} onClose={onClosed} {...props}>
      {children}
    </MuiDialog>
  );
};

const Title: React.FunctionComponent<PropsWithChildren> = (props) => {
  const { children } = props;
  console.info("Modal->Title render");

  return (
    <DialogTitle
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {children}
    </DialogTitle>
  );
};

const Content: React.FunctionComponent<PropsWithChildren> = (props) => {
  const { children } = props;
  console.info("Modal->Content render");

  return (
    <DialogContent
      sx={{
        p: 2,
        m: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {children}
    </DialogContent>
  );
};

const Actions: React.FunctionComponent<PropsWithChildren> = (props) => {
  const { children } = props;
  console.info("Modal->Actions render");

  return <DialogActions>{children}</DialogActions>;
};

export type ModalHook = {
  isOpen: boolean;
  Dialog: {
    (props: DialogProps): JSX.Element;
    Title: React.FunctionComponent<PropsWithChildren>;
    Content: React.FunctionComponent<PropsWithChildren>;
    Actions: React.FunctionComponent<PropsWithChildren>;
  };
  open: () => void;
  close: () => void;
};

export const useModal = (): ModalHook => {
  const [isOpen, setIsOpen] = useState(false);
  console.info("useModal render");

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  const Dialog = (props: DialogProps) => (
    <ModalBase onClosed={close} isOpen={isOpen} {...props}>
      {props.children}
    </ModalBase>
  );

  Dialog.Title = Title;
  Dialog.Content = Content;
  Dialog.Actions = Actions;

  return {
    isOpen,
    Dialog,
    open,
    close,
  };
};
