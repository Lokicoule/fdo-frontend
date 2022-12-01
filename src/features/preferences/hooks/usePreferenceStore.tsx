import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";
import { useSetMode, useMode } from "../stores/preferenceStore";

export const usePreferenceStore = () => {
  const [isReady, setIsReady] = React.useState(false);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const setMode = useSetMode();
  const mode = useMode();

  async function initPreferenceStore() {
    setIsReady(false);
    try {
      if (!Boolean(mode)) setMode(prefersDarkMode ? "dark" : "light");
    } finally {
      setIsReady(true);
    }
  }

  React.useEffect(() => {
    initPreferenceStore();
  }, []);

  return {
    isReady,
  };
};
