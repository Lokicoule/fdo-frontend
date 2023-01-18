import {
  createContext,
  forwardRef,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  createTheme,
  CssBaseline,
  LinkProps,
  ThemeOptions,
  ThemeProvider as MuiThemeProvider,
  useMediaQuery,
  ComponentsOverrides,
} from "@mui/material";

import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
import { useMode } from "~/features/settings/stores";
import { Mode } from "~/features/settings";

const LinkBehavior = forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }
>((props, ref) => {
  const { href, ...other } = props;

  return <RouterLink ref={ref} to={href} {...other} />;
});

const primary = {
  light: "#33ab9f",
  main: "#009688",
  dark: "#00695f",
  contrastText: "#fff",
};

const components = {
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
      styleOverrides: {
        root: {
          textDecoration: "none",
          color: "inherit",
          "&:hover": {
            color: primary.main,
          },
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
    MuiTab: {
      defaultProps: {
        component: LinkBehavior,
      },
    },
  },
};

const themes = {
  light: {
    palette: {
      mode: "light",
      primary: {
        ...primary,
      },
      secondary: {
        light: "#f73378",
        main: "#f50057",
        dark: "#ab003c",
        contrastText: "#000",
      },
    },
  } satisfies ThemeOptions,
  dark: {
    palette: {
      mode: "dark",
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
  } satisfies ThemeOptions,
};

type ThemeContextType = {
  mode: Mode;
  dark: () => void;
  light: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  mode: "system",
  dark: () => {},
  light: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FunctionComponent<React.PropsWithChildren> = (
  props
) => {
  const { children } = props;
  const { mode, setMode } = useMode();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const handleLight = () => {
    setMode("light");
  };

  const handleDark = () => {
    setMode("dark");
  };

  const isDark = useMemo(() => {
    if (mode === "system") {
      return prefersDarkMode;
    }
    return mode === "dark";
  }, [mode]);

  const themeOptions = useMemo(
    () => ({
      palette: isDark ? themes.dark.palette : themes.light.palette,
    }),
    [mode]
  );

  const themeBase = createTheme(themeOptions, components);

  const value = {
    mode,
    dark: handleDark,
    light: handleLight,
  };

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={themeBase}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
