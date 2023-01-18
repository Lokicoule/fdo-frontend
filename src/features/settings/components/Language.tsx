import {
  MenuItem,
  Select,
  SelectChangeEvent,
  SelectProps,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const languages = [
  {
    code: "en-EN",
    name: "English",
  },
  {
    code: "fr-FR",
    name: "Français",
  },
];

type LanguageProps = Pick<SelectProps, "variant" | "MenuProps" | "size" | "sx">;

export const Language: React.FunctionComponent<LanguageProps> = (props) => {
  const { i18n } = useTranslation();

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
