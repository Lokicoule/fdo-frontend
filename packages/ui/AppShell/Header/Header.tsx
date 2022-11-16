import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { ThemeColor } from "../ThemeColor/ThemeColor";

const drawerWidth = 240;

interface HeaderProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<HeaderProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const Header: React.FC<HeaderProps> = (props) => {
  const { open, title, onClick } = props;

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={onClick}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" flexGrow={1}>
          {title}
        </Typography>
        <ThemeColor />
      </Toolbar>
    </AppBar>
  );
};
