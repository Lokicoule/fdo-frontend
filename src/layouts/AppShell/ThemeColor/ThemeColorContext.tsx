import { createContext, useContext } from "react";

interface ThemeColorContextValue {
  toggleThemeColor: () => void;
}

const ThemeColorContext = createContext<ThemeColorContextValue>({
  toggleThemeColor: () => {},
});

export const ThemeColorProvider = ThemeColorContext.Provider;

export function useThemeColor() {
  return useContext(ThemeColorContext);
}
