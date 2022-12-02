import createTheme from "@mui/material/styles/createTheme";
import React from "react";
import { useAuthStore } from "../../../features/authentication/hooks";
import { usePreferenceStore } from "../../../features/preferences/hooks/usePreferenceStore";
import { useMode } from "../../../features/preferences/stores/preferenceStore";

export const useApplicationStore = () => {
  const preferenceStore = usePreferenceStore();
  const authStore = useAuthStore();
  const mode = useMode();

  const theme = React.useMemo(
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
      }),
    [mode]
  );

  return {
    isReady: preferenceStore.isReady && authStore.isReady,
    theme,
  };
};
