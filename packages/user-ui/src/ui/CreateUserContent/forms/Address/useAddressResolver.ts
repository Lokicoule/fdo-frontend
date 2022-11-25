import { useYupValidationResolver } from "form";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  number: yup.string().required("Le numéro est requis."),
  street: yup.string().required("La rue est requise."),
  city: yup.string().required("La ville est requise."),
  zipCode: yup
    .string()
    .matches(/^[0-9]{5}$/)
    .required("Le code postal est requis."),
  country: yup.string().required("Le pays est requis."),
});

export const useUserResolver = () => useYupValidationResolver(validationSchema);
