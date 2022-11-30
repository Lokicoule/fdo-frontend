import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import { useToggleMode } from "../../../features/preference/stores/preferenceStore";

export function ThemeColor() {
  const theme = useTheme();
  const toggleMode = useToggleMode();

  return (
    <IconButton
      color="inherit"
      aria-label="toggle theme color"
      onClick={toggleMode}
    >
      {theme.palette.mode === "dark" ? (
        <Brightness7Icon />
      ) : (
        <Brightness4Icon />
      )}
    </IconButton>
  );
}
