import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { SwipeableDrawer } from "../Elements/SwipeableDrawer";
import { IconButton, Box, Typography, Divider, Stack } from "@mui/material";
import { Mode } from "./Mode";
import { LanguageSelector } from "./LanguageSelector";

export const Settings = () => {
  return (
    <SwipeableDrawer
      anchor="right"
      closeIcon
      title={"Settings"}
      triggerButton={
        <IconButton
          color="inherit"
          /* sx={{
            borderRadius: 1,
            border: (theme) => `1px solid RGBA(255,255,255,0.3)`,
          }} */
        >
          <SettingsOutlinedIcon />
        </IconButton>
      }
    >
      <Stack
        sx={{
          pt: (theme) => theme.spacing(4),
        }}
        direction="column"
        spacing={3}
      >
        <Stack direction={"column"} spacing={1}>
          <Typography variant="overline">Mode</Typography>
          <Mode />
        </Stack>
        <Box>
          <Stack direction={"column"} spacing={1}>
            <Typography variant="overline">Langues</Typography>
            <LanguageSelector
              MenuProps={{
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left",
                },
              }}
            />
          </Stack>
        </Box>
      </Stack>
    </SwipeableDrawer>
  );
};
