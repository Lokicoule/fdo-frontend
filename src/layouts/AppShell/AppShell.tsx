import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled, ThemeProvider } from "@mui/material/styles";
import { useToggle } from "../../hooks";
import * as React from "react";
import { BrowserRouter, Link, Outlet, Route, Routes } from "react-router-dom";
import { Header } from "./Header";
import { Navbar } from "./Navbar/Navbar";
import { ThemeColorProvider, useThemeColorMode } from "./ThemeColor";
import { AuthProvider } from "../../modules/auth/context/AuthContext";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
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
  colorScheme?: ColorScheme;
  render?: React.ReactNode;
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
  const { title, routes, navLinks, colorScheme, render } = props;
  const [open, setOpen] = useToggle();

  const { theme, themeColor } = useThemeColorMode(colorScheme);

  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeColorProvider value={themeColor}>
          <ThemeProvider theme={theme}>
            <Box sx={{ display: "flex" }}>
              <CssBaseline />
              <Header
                title={title}
                open={open}
                onOpen={setOpen}
                render={render}
              />
              <Navbar
                open={open}
                onClick={setOpen}
                render={navLinks.map((link) => (
                  <MainLink {...link} open={open} key={link.label} />
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
      </AuthProvider>
    </BrowserRouter>
  );
};
