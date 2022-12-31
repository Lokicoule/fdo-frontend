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
} from "@mui/material";

import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";

const LinkBehavior = forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }
>((props, ref) => {
  const { href, ...other } = props;

  return <RouterLink ref={ref} to={href} {...other} />;
});

const components = {
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

type Theme = typeof themes.light | typeof themes.dark;

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: themes.light,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FunctionComponent<React.PropsWithChildren> = (
  props
) => {
  const { children } = props;

  const [theme, setTheme] = useState<Theme>(themes.light);
  const [isDark, setIsDark] = useState(
    useMediaQuery("(prefers-color-scheme: dark)")
  );

  const toggleTheme = () => {
    console.log("toggleTheme", isDark);
    setIsDark(!isDark);
    setTheme(isDark ? themes.light : themes.dark);
  };

  const themeOptions = useMemo(
    () => ({
      palette: theme.palette,
    }),
    [isDark]
  );

  const themeBase = createTheme(themeOptions, components);
  console.log(themeBase);

  const value = {
    theme,
    toggleTheme,
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
