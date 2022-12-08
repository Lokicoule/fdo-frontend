import { useMemo } from "react";

import createTheme from "@mui/material/styles/createTheme";

import { useAuthStore } from "../../../features/authentication/hooks";
import { usePreferenceStore } from "../../../features/preferences/hooks/usePreferenceStore";
import { useMode } from "../../../features/preferences/stores/preferenceStore";

import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
import { LinkProps } from "@mui/material/Link";
import React from "react";

const LinkBehavior = React.forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }
>((props, ref) => {
  const { href, ...other } = props;

  return <RouterLink ref={ref} to={href} {...other} />;
});

export const useApplicationStore = () => {
  const preferenceStore = usePreferenceStore();
  const authStore = useAuthStore();
  const mode = useMode();

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode ?? "light",
          primary: {
            light: "#33ab9f",
            main: "#009688",
            dark: "#00695f",
            contrastText: "#fff",
          },
          secondary: {
            light: "#f73378",
            main: "#f50057",
            dark: "#ab003c",
            contrastText: "#000",
          },
        },
        components: {
          MuiLink: {
            defaultProps: {
              component: LinkBehavior,
            } as LinkProps,
          },
          MuiButtonBase: {
            defaultProps: {
              LinkComponent: LinkBehavior,
            },
          },
        },
      }),
    [mode]
  );

  return {
    isReady: preferenceStore.isReady && authStore.isReady,
    theme,
  };
};
