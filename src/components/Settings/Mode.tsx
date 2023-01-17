import DarkIcon from "@mui/icons-material/DarkModeOutlined";
import LightIcon from "@mui/icons-material/LightModeOutlined";
import SystemIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import { Button, ButtonGroup } from "@mui/material";
import { useTheme } from "~/providers/theme";

export const Mode = () => {
  const { light, dark, system, mode } = useTheme();

  return (
    <ButtonGroup
      sx={{
        width: "100%",
        justifyContent: "center",
      }}
      variant="outlined"
    >
      <Button
        startIcon={<LightIcon />}
        onClick={light}
        variant={mode === "light" ? "contained" : "outlined"}
      >
        Light
      </Button>
      <Button
        startIcon={<SystemIcon />}
        onClick={system}
        variant={mode === "system" ? "contained" : "outlined"}
      >
        System
      </Button>
      <Button
        startIcon={<DarkIcon />}
        onClick={dark}
        variant={mode === "dark" ? "contained" : "outlined"}
      >
        Dark
      </Button>
    </ButtonGroup>
  );
};
