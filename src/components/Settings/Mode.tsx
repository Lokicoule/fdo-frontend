import DarkIcon from "@mui/icons-material/DarkModeOutlined";
import LightIcon from "@mui/icons-material/LightModeOutlined";
import SystemIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import {
  Button,
  ButtonGroup,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useTheme } from "~/providers/theme";

export const Mode = () => {
  const { light, dark, system, mode } = useTheme();

  return (
    <ToggleButtonGroup
      color="primary"
      value={mode}
      exclusive
      sx={{
        justifyContent: "center",
      }}
    >
      <ToggleButton onClick={light} value={"light"}>
        <Stack direction="row" spacing={1}>
          <LightIcon />
          <Typography>Light</Typography>
        </Stack>
      </ToggleButton>
      <ToggleButton onClick={system} value="system">
        <Stack direction="row" spacing={1}>
          <SystemIcon />
          <Typography>System</Typography>
        </Stack>
      </ToggleButton>
      <ToggleButton onClick={dark} value="dark">
        <Stack direction="row" spacing={1}>
          <DarkIcon />
          <Typography>Dark</Typography>
        </Stack>
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
