import { useYupValidationResolver } from "form";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  name: yup.string().trim().required("Le nom est requis."),
  vatNumber: yup
    .string()
    .matches(/^[A-Z]{2}[0-9]{11}$/, "Le numéro de TVA est invalide")
    .required("Le numéro de TVA est requis."),
  rcsNumber: yup
    .string()
    .matches(
      /^RCS\s[A-Z]+\s([A-Z]\s)?[0-9]{3}\s[0-9]{3}\s[0-9]{3}$/,
      "Le numéro de registre du commerce et des sociétés est invalide"
    ),
  /* .when("siret", {
      is: (siret: string) => !Boolean(siret),
      then: yup
        .string()
        .required(
          "Le numéro de registre du commerce et des sociétés est requis."
        ),
    }), */ /*  .when("siren", {
      is: (siren: string) => Boolean(siren),
      then: yup
        .string()
        .required(
          "Le numéro de registre du commerce et des sociétés est requis."
        ),
    }), */ siren: yup
    .string()
    .matches(/^[0-9]{9}$/, "Le numéro SIREN est invalide"),
  /*  .when("siret", {
      is: (siret: string) => !Boolean(siret),
      then: yup.string().required("Le numéro SIREN est requis."),
    }), */ /*  .when("rcsNumber", {
      is: (rcsNumber: string) => Boolean(rcsNumber),
      then: yup.string().required("Le numéro SIREN est requis."),
    }), */ siret: yup
    .string()
    .matches(/^(\d{14})$/, "Le numéro de SIRET est invalide"),
  /* .when("siren", {
      is: (siren: string) => !Boolean(siren),
      then: yup.string().required("Le numéro de SIRET est requis."),
    }), */
});

export const useCompanyResolver = () =>
  useYupValidationResolver(validationSchema);
