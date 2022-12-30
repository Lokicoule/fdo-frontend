import TranslateIcon from "@mui/icons-material/Translate";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

import Menu from "~/components/Menu";

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
    <Menu
      renderToggle={({ onClick }) => (
        <Tooltip title={t("Language")}>
          <IconButton
            sx={{
              color: "inherit",
            }}
            onClick={onClick}
          >
            <TranslateIcon />
          </IconButton>
        </Tooltip>
      )}
    >
      <Menu.List>
        {languages.map((language) => (
          <Menu.Item
            sx={{}}
            key={language.code}
            onClick={() => handleChangeLanguage(language.code)}
          >
            <ListItemIcon>
              {language.code === i18n.language ? "✓" : ""}
            </ListItemIcon>
            <Typography>{language.name}</Typography>
          </Menu.Item>
        ))}
      </Menu.List>
    </Menu>
  );
};
