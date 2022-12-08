import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import { MenuButton } from "../../../components/MenuButton";

export const LanguageMenu: React.FunctionComponent = () => {
  const languages = [
    { code: "en", name: "English" },
    { code: "fr", name: "Français" },
  ];

  return (
    <MenuButton
      renderButton={({ onClick }) => (
        <Tooltip title="Language">
          <IconButton onClick={onClick}>
            <Box
              component="img"
              src={`https://www.countryflags.io/us/flat/24.png`}
              sx={{ width: 24, height: 24 }}
            />
          </IconButton>
        </Tooltip>
      )}
      renderMenu={({ onClose }) =>
        languages.map((language) => (
          <MenuItem key={language.code} onClick={onClose}>
            <ListItemIcon>
              <Box
                component="img"
                src={`https://www.countryflags.io/${language.code}/flat/24.png`}
                sx={{ width: 24, height: 24 }}
              />
            </ListItemIcon>
            <Typography variant="inherit">{language.name}</Typography>
          </MenuItem>
        ))
      }
    />
  );
};
