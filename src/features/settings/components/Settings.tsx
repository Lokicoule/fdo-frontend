import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { SwipeableDrawer } from "~/components/Elements/SwipeableDrawer";
import { Language } from "./Language";
import { Mode } from "./Mode";

export const Settings = () => {
  return (
    <SwipeableDrawer
      anchor="right"
      closeIcon
      title={"Settings"}
      triggerButton={
        <Tooltip title={"Settings"}>
          <IconButton
            color="inherit"
            size="medium"
            /*  sx={{
              borderRadius: 2,
              border: (theme) => `1px solid RGBA(255,255,255,0.3)`,
            }} */
          >
            <SettingsOutlinedIcon />
          </IconButton>
        </Tooltip>
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
        <Stack direction={"column"} spacing={1}>
          <Typography variant="overline">Langues</Typography>
          <Language
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
      </Stack>
    </SwipeableDrawer>
  );
};
