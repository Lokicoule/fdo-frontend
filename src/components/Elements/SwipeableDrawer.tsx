import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import MuiSwipeableDrawer, {
  SwipeableDrawerProps as MuiSwipeableDrawerProps,
} from "@mui/material/SwipeableDrawer";
import { cloneElement } from "react";
import { useDisclosure } from "~/hooks/useDisclosure";
import CloseIcon from "@mui/icons-material/Close";

export type SwipeableDrawerProps = React.PropsWithChildren<
  Omit<MuiSwipeableDrawerProps, "open" | "onClose" | "onOpen"> & {
    triggerButton: React.ReactElement;
    keepMounted?: boolean;
    title?: React.ReactNode;
    closeIcon?: boolean;
  }
>;

export const SwipeableDrawer: React.FunctionComponent<SwipeableDrawerProps> = (
  props
) => {
  const {
    triggerButton,
    keepMounted,
    title,
    children,
    anchor,
    closeIcon,
    ...others
  } = props;
  const { isOpen, open, close } = useDisclosure();

  const trigger = cloneElement(triggerButton, {
    onClick: open,
  });

  return (
    <div>
      {trigger}
      <MuiSwipeableDrawer
        {...others}
        anchor={anchor}
        open={isOpen}
        onOpen={open}
        onClose={close}
        PaperProps={{
          sx: {
            borderRadius: "10px 0px 0px 10px",
            width: anchor === "top" || anchor === "bottom" ? "auto" : 360,
          },
        }}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        {isOpen || keepMounted ? (
          <Box onKeyDown={close}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ pt: 1.5, pl: 2, pr: 0.5, pb: 1.5 }}
            >
              <Typography variant="h6">{title}</Typography>

              {closeIcon ? (
                <IconButton onClick={close}>
                  <CloseIcon />
                </IconButton>
              ) : null}
            </Stack>
            <Divider />
            <Box sx={{ p: 2 }}>{children}</Box>
          </Box>
        ) : null}
      </MuiSwipeableDrawer>
    </div>
  );
};
