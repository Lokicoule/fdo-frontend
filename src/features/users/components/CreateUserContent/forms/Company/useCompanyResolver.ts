import * as yup from "yup";
import { useYupValidationResolver } from "../../../../../../hooks/useYupValidationResolver";

const validationSchema = yup.object().shape({
  name: yup.string().trim().required("Le nom est requis."),
  vatNumber: yup
    .string()
    .matches(
      /^[a-zA-Z]{2}\s?\d{2}\s?\d{3}\s?\d{3}\s?\d{3}$/,
      "Le numéro de TVA est invalide. ex: FR XX XXX XXX XXX ou FR XX XXXXXXXXX ou FR XXXXXXXXXXX ou FRXXXXXXXXXXX"
    )
    .required("Le numéro de TVA est requis."),
  rcsNumber: yup
    .string()
    .matches(
      /^RCS\s[A-Z]+\s([A-Z]\s?)?\d{3}\s?\d{3}\s?\d{3}$/,
      "Le numéro de registre du commerce et des sociétés est invalide. Ex: RCS PARIS XXX XXX XXX ou RCS PARIS XXXXXXXXX ou RCS PARIS AB XXX XXX XXX ou RCS PARIS AB XXXXXXXXX"
    ),
  siren: yup
    .string()
    .matches(
      /^\d{3}\s?\d{3}\s?\d{3}$/,
      "Le numéro SIREN est invalide. Ex: XXX XXX XXX ou XXXXXXXXX"
    ),
  siret: yup
    .string()
    .matches(
      /^\d{3}\s?\d{3}\s?\d{3}\s\d{5}$/,
      "Le numéro de SIRET est invalide. Ex: XXX XXX XXX XXXXX ou XXXXXXXXX XXXXX"
    ),
});

export const useCompanyResolver = () =>
  useYupValidationResolver(validationSchema);
