import * as React from "react";
import { BrowserRouter, Outlet, Link, Routes, Route } from "react-router-dom";
import {
  styled,
  useTheme,
  Theme,
  CSSObject,
  ThemeProvider,
  createTheme,
} from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Grid from "@mui/material/Grid";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useToggle } from "hooks";
import { Header } from "./Header";
import { ThemeColorProvider, useThemeColorMode } from "./ThemeColor";
import { Navbar } from "./Navbar/Navbar";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

type ColorScheme = "light" | "dark";

export type Route = {
  element: React.FunctionComponent;
  path: string;
};

export type NavLink = {
  label: string;
  path: string;
  icon: JSX.Element;
};

export type AppShellProps = {
  title: string;
  routes: Route[];
  navLinks: NavLink[];
  colorScheme: ColorScheme;
};

function MainLink({
  label,
  path,
  icon,
  open,
}: NavLink & { open: boolean }): JSX.Element {
  return (
    <ListItem key={label} disablePadding sx={{ display: "block" }}>
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: open ? "initial" : "center",
          px: 2.5,
        }}
        component={Link}
        to={path}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : "auto",
            justifyContent: "center",
          }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText primary={label} sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
    </ListItem>
  );
}

export const AppShell: React.FC<AppShellProps> = (props) => {
  const { title, routes, navLinks, colorScheme } = props;
  const [open, setOpen] = useToggle();

  const { theme, themeColor } = useThemeColorMode(colorScheme);

  return (
    <BrowserRouter>
      <ThemeColorProvider value={themeColor}>
        <ThemeProvider theme={theme}>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <Header title={title} open={open} onClick={setOpen} />
            <Navbar
              open={open}
              onClick={setOpen}
              render={navLinks.map((link) => (
                <MainLink {...link} open={open} />
              ))}
            ></Navbar>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <DrawerHeader />
              <Routes>
                {routes.map((route) => (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={<route.element />}
                  />
                ))}
              </Routes>
              <Outlet />
            </Box>
          </Box>
        </ThemeProvider>
      </ThemeColorProvider>
    </BrowserRouter>
  );
};
