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
        },
      }),
    [mode]
  );

  return {
    isReady: preferenceStore.isReady && authStore.isReady,
    theme,
  };
};
