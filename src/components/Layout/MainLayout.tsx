import { useState } from "react";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DashboardIcon from "@mui/icons-material/GridViewSharp";
import MenuIcon from "@mui/icons-material/Menu";
import ProductIcon from "@mui/icons-material/QrCode2Sharp";
import { Stack } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { CSSObject, styled, Theme, useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { ProfileMenu } from "~/features/profile/components/ProfileMenu";
import { Settings } from "~/features/settings";
import { useSidebar } from "~/stores/app";

type AppBarProps = MuiAppBarProps & {
  open?: boolean;
};

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
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
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

const SideNavigation = () => {
  const { t } = useTranslation();

  const navigation = [
    {
      name: t("dictionary.dashboard"),
      icon: <DashboardIcon />,
      path: "/app",
    },
    {
      name: t("dictionary.customers"),
      icon: <ProductIcon />,
      path: "/app/customers",
    },
    {
      name: t("dictionary.products"),
      icon: <ProductIcon />,
      path: "/app/products",
    },
  ];
  return (
    <List>
      {navigation.map((item) => (
        <ListItem key={item.name} disablePadding>
          <ListItemButton component={NavLink} to={item.path}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

const MobileSidebar: React.FunctionComponent<{
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}> = (props) => {
  const { mobileOpen, handleDrawerToggle } = props;

  return (
    <MuiDrawer
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        display: { xs: "block", sm: "none" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: drawerWidth,
        },
      }}
    >
      <SideNavigation />
    </MuiDrawer>
  );
};

const DesktopSidebar: React.FunctionComponent<{
  open: boolean;
  handleDrawerClose: () => void;
}> = (props) => {
  const { open, handleDrawerClose } = props;
  const theme = useTheme();

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <SideNavigation />
    </Drawer>
  );
};

const ResponsiveSidebar: React.FunctionComponent<{
  open: boolean;
  onToggle: () => void;
}> = (props) => {
  const { open, onToggle } = props;
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  if (isSmallScreen) {
    return <MobileSidebar mobileOpen={open} handleDrawerToggle={onToggle} />;
  }
  return <DesktopSidebar open={open} handleDrawerClose={onToggle} />;
};

export const MainLayout: React.FunctionComponent<React.PropsWithChildren> = (
  props
) => {
  const { children } = props;
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const theme = useTheme();

  const width = isSidebarOpen ? drawerWidth : theme.spacing(7) + 1;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" open={isSidebarOpen}>
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={toggleSidebar}
            edge="start"
            sx={{
              marginRight: 5,
              ...(isSidebarOpen && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            FDO Invoice
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Stack direction="row" spacing={2} alignItems="center">
            <ProfileMenu />
            <Settings />
          </Stack>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { sm: width }, flexShrink: { sm: 0 } }}>
        <ResponsiveSidebar open={isSidebarOpen} onToggle={toggleSidebar} />
      </Box>
      <Box
        component="main"
        boxSizing={"border-box"}
        maxWidth="100%"
        sx={{
          flexGrow: 1,
          p: 3,
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};
