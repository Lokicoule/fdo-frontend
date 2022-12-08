import { useEffect, useState } from "react";

import useMediaQuery from "@mui/material/useMediaQuery";

import { useSetMode, useMode } from "../stores/preferenceStore";

export const usePreferenceStore = () => {
  const [isReady, setIsReady] = useState(false);
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

  useEffect(() => {
    initPreferenceStore();
  }, []);

  return {
    isReady,
  };
};
