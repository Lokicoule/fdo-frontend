import MuiMenu, { MenuProps as MuiMenuProps } from "@mui/material/Menu";
import MuiMenuItem, { MenuItemProps } from "@mui/material/MenuItem";
import MuiMenuList from "@mui/material/MenuList";

import { cloneElement, useEffect, useState } from "react";
import { preventRenderingIf } from "~/utils/render";

export type MenuProps = Omit<MuiMenuProps, "children" | "open"> & {
  triggerButton: React.ReactElement;
  children: (props: { onClose: () => void }) => React.ReactNode;
  isDone?: boolean;
  onClose?: () => void;
};

export const MenuItem = MuiMenuItem;
export const MenuList = MuiMenuList;

export const Menu: React.FunctionComponent<MenuProps> = (props) => {
  const { children, isDone, triggerButton, onClose, ...others } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (isDone) {
      handleClose();
    }
  }, [isDone]);

  const trigger = cloneElement(triggerButton, {
    onClick: handleClick,
  });

  return (
    <>
      {trigger}
      {preventRenderingIf(isOpen).render(
        <MuiMenu
          {...others}
          open={isOpen}
          onClose={handleClose}
          anchorEl={anchorEl}
        >
          {children({ onClose: handleClose })}
        </MuiMenu>
      )}
    </>
  );
};
