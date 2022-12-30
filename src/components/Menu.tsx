import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";

import Link from "@mui/material/Link";
import MuiListItem from "@mui/material/ListItem";
import MuiMenu from "@mui/material/Menu";
import MuiMenuItem, { MenuItemProps } from "@mui/material/MenuItem";
import MuiMenuList from "@mui/material/MenuList";

type ToggleProps = {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
};

type LinkItemProps = PropsWithChildren & {
  to: string;
};

type MenuProps = {
  renderToggle: (props: ToggleProps) => JSX.Element;
};

type MenuContextProps = {
  open: boolean;
  onClick: (event: React.MouseEvent<HTMLElement | HTMLLIElement>) => void;
  onClose: () => void;
};

const MenuContext = createContext<MenuContextProps>({
  open: false,
  onClick: () => {},
  onClose: () => {},
} satisfies MenuContextProps);

const useMenu = () => {
  const context = useContext(MenuContext);
  if (context === null) {
    throw new Error("useMenu must be used within a Menu");
  }
  return context;
};

function Menu(props: PropsWithChildren<MenuProps>): JSX.Element {
  const { children, renderToggle } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const value = {
    open,
    onClick: handleClick,
    onClose: handleClose,
  };

  return (
    <MenuContext.Provider value={value}>
      {renderToggle({ onClick: handleClick })}
      <MuiMenu
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
        {children}
      </MuiMenu>
    </MenuContext.Provider>
  );
}

const List: React.FunctionComponent<PropsWithChildren> = (
  props
): JSX.Element => {
  const { children } = props;

  return <MuiMenuList>{children}</MuiMenuList>;
};

const Item: React.FunctionComponent<MenuItemProps> = (props): JSX.Element => {
  const { children, onClick, ...others } = props;
  const context = useMenu();

  const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
    if (onClick) {
      onClick(event);
    }
    context.onClick(event);
  };

  return (
    <MuiMenuItem onClick={handleClick} {...others}>
      {children}
    </MuiMenuItem>
  );
};

const LinkItem: React.FunctionComponent<LinkItemProps> = (
  props
): JSX.Element => {
  const { children, to } = props;
  const context = useMenu();

  const handleClick = (event: any) => {
    context.onClick(event);
  };

  return (
    <MuiListItem
      sx={{
        color: "inherit",
        "&:hover": {
          backgroundColor: "primary.light",
        },
      }}
      onClick={handleClick}
      component={Link}
      href={to}
    >
      {children}
    </MuiListItem>
  );
};

Menu.List = List;
Menu.Item = Item;
Menu.LinkItem = LinkItem;

export type { MenuProps, MenuContextProps };
export { MenuContext, useMenu };
export default Menu;
