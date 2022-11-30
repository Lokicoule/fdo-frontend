import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  createTheme,
  styled,
  ThemeProvider,
  useTheme,
} from "@mui/material/styles";
import * as React from "react";
import { BrowserRouter, Link, Outlet, Route, Routes } from "react-router-dom";
import {
  useIsDrawerOpen,
  useMode,
  useToggleDrawer,
} from "../../features/preference/stores/preferenceStore";
import { usePreferenceStore } from "../../features/preference/hooks/usePreferenceStore";
import { useAuthStore } from "../../features/authentication/hooks/useAuthStore";
import { Header } from "./Header";
import { Navbar } from "./Navbar/Navbar";

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
  const { title, routes, navLinks, render } = props;
  const { isReady } = useAuthStore();
  const app = usePreferenceStore();

  const isDrawerOpen = useIsDrawerOpen();
  const toggleDrawer = useToggleDrawer();
  const mode = useMode();
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode ?? "light",
        },
      }),
    [mode]
  );

  if (!isReady || !app.isReady) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <Header
            title={title}
            open={isDrawerOpen}
            onOpen={toggleDrawer}
            render={render}
          />
          <Navbar
            open={isDrawerOpen}
            onClick={toggleDrawer}
            render={navLinks.map((link) => (
              <MainLink {...link} open={isDrawerOpen} key={link.label} />
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
    </BrowserRouter>
  );
};
