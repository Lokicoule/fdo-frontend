import countries from "i18n-iso-countries";
import React from "react";
import { FormInputSelect, FormInputSelectProps } from "./Form/FormInputSelect";

import countriesEN from "i18n-iso-countries/langs/en.json";
import countriesFR from "i18n-iso-countries/langs/fr.json";
import { MenuItem } from "@mui/material";

countries.registerLocale(countriesEN);
countries.registerLocale(countriesFR);

type SelectCountryProps = Omit<FormInputSelectProps, "children">;

const countriesList = countries.getNames("fr", { select: "official" });

export const SelectCountry: React.FC<SelectCountryProps> = (props) => {
  const {
    name,
    label,
    defaultValue = "FR",
    control,
    error,
    helperText,
  } = props;
  //const countriesListFr = countries.getNames("fr", { select: "official" });

  return (
    <FormInputSelect
      name={name}
      label={label}
      defaultValue={defaultValue}
      control={control}
      error={error}
      helperText={helperText}
    >
      {Object.entries(countriesList).map(([key, value]) => (
        <MenuItem key={key} value={key}>
          {value}
        </MenuItem>
      ))}
    </FormInputSelect>
  );
};
