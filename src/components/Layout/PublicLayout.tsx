import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Toolbar from "@mui/material/Toolbar";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import * as React from "react";

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

interface LinkTabProps {
  label?: string;
  href?: string;
}

function PublicNavigation() {
  console.info("PublicNavigation");
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    event.preventDefault();
  };

  return (
    <Tabs value={value} onChange={handleChange}>
      <Tab
        sx={{
          fontWeight: "bold",
          fontSize: "1.5rem",
        }}
        label="FDO App"
        href="/"
      />
      <Tab label="Login" href="/auth/login" />
      <Tab label="Register" href="/auth/register" />
    </Tabs>
  );
}

export const PublicLayout = (props: Props) => {
  console.info("PublicLayout", props);

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
      <Container>
        <Box sx={{ my: 2 }}>{props.children}</Box>
      </Container>
    </>
  );
};
