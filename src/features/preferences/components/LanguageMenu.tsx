import {
  Box,
  IconButton,
  ListItemIcon,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { MenuButton } from "../../../components/MenuButton";

export const LanguageMenu: React.FC = () => {
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
