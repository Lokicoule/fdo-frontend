import createTheme from "@mui/material/styles/createTheme";
import React from "react";
import { ThemeColorEnum, getThemeColor } from "./ThemeColorEnum";

export const useThemeColorMode = (color: string | ThemeColorEnum) => {
  const [mode, setMode] = React.useState<ThemeColorEnum>(getThemeColor(color));

  const themeColor = React.useMemo(
    () => ({
      toggleThemeColor: () => {
        setMode((prevMode) =>
          prevMode === ThemeColorEnum.LIGHT
            ? ThemeColorEnum.DARK
            : ThemeColorEnum.LIGHT
        );
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return { theme, themeColor };
};
