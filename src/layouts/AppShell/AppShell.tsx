import { BrowserRouter, Link, Outlet, Route, Routes } from "react-router-dom";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled, ThemeProvider } from "@mui/material/styles";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "~/libs/react-query-client";

import { ErrorBoundary } from "./components/ErrorBoundary";
import { Header } from "./components/Header";
import { Loading } from "./components/Loading";
import { Navbar } from "./components/Navbar";

import { useApplicationStore } from "./hooks/useApplicationStore";

import { useIsDrawerOpen, useToggleDrawer } from "./stores/applicationStore";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

export type Route = {
  element: React.FunctionComponent | React.ComponentClass;
  path: string;
};

export type NavLink = {
  label: string;
  path: string;
  icon: JSX.Element;
};

export type MenuElement = {
  key: string;
  element: JSX.Element;
};

export type AppShellProps = {
  title: string;
  routes: Route[];
  navLinks: NavLink[];
  menuButtons?: MenuElement[];
  failover?: JSX.Element;
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

export const AppShell: React.FunctionComponent<AppShellProps> = (props) => {
  const { title, routes, navLinks, menuButtons, failover } = props;
  const { isReady, theme } = useApplicationStore();

  const isDrawerOpen = useIsDrawerOpen();
  const toggleDrawer = useToggleDrawer();

  if (!isReady) {
    return <Loading />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "80vh",
            }}
          >
            <CssBaseline />
            <Header
              title={title}
              open={isDrawerOpen}
              onOpen={toggleDrawer}
              render={menuButtons?.map((button, i) => (
                <div
                  style={{
                    marginRight: `${i + 1 <= menuButtons.length ? 10 : 0}px`,
                  }}
                  key={button.key}
                >
                  {button.element}
                </div>
              ))}
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
              <ErrorBoundary failover={failover}>
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
              </ErrorBoundary>
            </Box>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
