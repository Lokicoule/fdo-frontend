import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useTranslation, Trans } from "react-i18next";
import TranslateIcon from "@mui/icons-material/Translate";

import { MenuButton } from "~/components/MenuButton";

const languages = [
  {
    code: "en",
    name: "English",
  },
  {
    code: "fr",
    name: "Français",
  },
];

export const LanguageMenu: React.FunctionComponent = () => {
  const { t, i18n } = useTranslation();

  const handleChangeLanguage = (code: string) => {
    i18n.changeLanguage(code);
  };

  return (
    <MenuButton
      renderButton={({ onClick }) => (
        <Tooltip title="Language">
          <IconButton onClick={onClick}>
            <TranslateIcon />
          </IconButton>
        </Tooltip>
      )}
      renderMenu={({ onClose }) =>
        languages.map((language) => (
          <MenuItem
            key={language.code}
            onClick={() => handleChangeLanguage(language.code)}
          >
            <Typography variant="inherit">{language.name}</Typography>
          </MenuItem>
        ))
      }
    />
  );
};
