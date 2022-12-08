import React, { useState } from "react";

import { Menu, Link } from "@mui/material";

export type MenuButtonProps = {
  renderMenu?:
    | ((props: {
        anchorEl: HTMLElement | null;
        onClose: () => void;
        LinkComponent: React.FunctionComponent<
          React.PropsWithChildren<LinkMenuItemProps>
        >;
      }) => React.ReactNode)
    | undefined;
  renderButton: (props: {
    onClick: (event: React.MouseEvent<HTMLElement>) => void;
  }) => React.ReactNode;
};

type LinkMenuItemProps = {
  to: string;
};

const LinkMenuItem: React.FunctionComponent<
  React.PropsWithChildren<LinkMenuItemProps>
> = (props) => {
  const { children, to } = props;

  return (
    <Link
      color={"inherit"}
      sx={{ display: "flex", textDecoration: "none" }}
      href={to}
    >
      {children}
    </Link>
  );
};

export const MenuButton: React.FunctionComponent<MenuButtonProps> = ({
  renderButton,
  renderMenu,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {renderButton({ onClick: handleClick })}
      {renderMenu && (
        <Menu
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          onClick={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          {renderMenu({
            onClose: handleClose,
            anchorEl,
            LinkComponent: LinkMenuItem,
          })}
        </Menu>
      )}
    </>
  );
};
