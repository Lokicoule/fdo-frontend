import React from "react";

import { MenuItem } from "@mui/material";

import countries from "i18n-iso-countries";
import countriesEN from "i18n-iso-countries/langs/en.json";
import countriesFR from "i18n-iso-countries/langs/fr.json";

import { FormInputSelect, FormInputSelectProps } from "./Form/FormInputSelect";

countries.registerLocale(countriesEN);
countries.registerLocale(countriesFR);

type Props = Omit<FormInputSelectProps, "children">;

const SelectCountry: React.FunctionComponent<Props> = (props) => {
  const { defaultValue = "FR", ...selectProps } = props;
  const countriesList = countries.getNames("fr", { select: "official" });
  //const countriesListFr = countries.getNames("fr", { select: "official" });

  return (
    <FormInputSelect {...selectProps} defaultValue={defaultValue}>
      {Object.entries(countriesList).map(([key, value]) => (
        <MenuItem key={key} value={key}>
          {value}
        </MenuItem>
      ))}
    </FormInputSelect>
  );
};

export type SelectCountryProps = Props;
export { SelectCountry };
