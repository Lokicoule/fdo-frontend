import AppBar from "@mui/material/AppBar";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Toolbar from "@mui/material/Toolbar";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import * as React from "react";
import { LOGIN_PATH } from "~/features/auth/routes/Login";
import { REGISTER_PATH } from "~/features/auth/routes/Register";
import { useLocation } from "react-router-dom";

interface Props {
  children: React.ReactElement;
}

function ElevationScroll(props: Props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    color: trigger ? "primary" : "transparent",
  });
}

const currentTab = (pathname: string) => {
  switch (pathname) {
    case "/":
      return 0;
    case LOGIN_PATH:
      return 1;
    case REGISTER_PATH:
      return 2;
    default:
      return 0;
  }
};

function PublicNavigation() {
  console.info("PublicNavigation");
  const { pathname } = useLocation();

  const value = currentTab(pathname?.toLowerCase());

  return (
    <Tabs value={value}>
      <Tab
        sx={{
          fontWeight: "bold",
          fontSize: "1.5rem",
        }}
        label="FDO App"
        href="/"
      />
      <Tab label="Login" href={LOGIN_PATH} />
      <Tab label="Register" href={REGISTER_PATH} />
    </Tabs>
  );
}

export const PublicLayout: React.FunctionComponent<React.PropsWithChildren> = (
  props
) => {
  console.info("PublicLayout", props);

  const { children } = props;

  return (
    <>
      <ElevationScroll {...props}>
        <AppBar>
          <Toolbar>
            <PublicNavigation />
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />

      {children}
    </>
  );
};
