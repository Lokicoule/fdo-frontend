import {
  MenuItem,
  Select,
  SelectChangeEvent,
  SelectProps,
} from "@mui/material";
import { useTranslation } from "react-i18next";

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

type LanguageSelectorProps = Pick<
  SelectProps,
  "variant" | "MenuProps" | "size" | "sx"
>;

export const LanguageSelector: React.FunctionComponent<
  LanguageSelectorProps
> = (props) => {
  const { i18n } = useTranslation();

  console.info("LanguageChooser render");

  const handleChangeLanguage = (code: string) => {
    i18n.changeLanguage(code);
  };

  return (
    <Select
      MenuProps={{
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        transformOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
      }}
      {...props}
      onChange={(event: SelectChangeEvent) =>
        handleChangeLanguage(event.target.value)
      }
      value={i18n.language}
    >
      {languages.map((language) => (
        <MenuItem sx={{ px: 2 }} key={language.code} value={language.code}>
          {language.name}
        </MenuItem>
      ))}
    </Select>
  );
};
