import * as yup from "yup";
import { useYupValidationResolver } from "../../../../../../hooks/useYupValidationResolver";

const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^[a-zA-Z]+$/, "Le nom ne peut contenir que des lettres")
    .required("Le prénom est requis."),
  lastName: yup.string().required("Le nom est requis."),
  email: yup
    .string()
    .email("L'adresse email est invalide")
    .required("L'adresse email est requise."),
  phone: yup
    .string()
    .matches(/^(\+33|0)[1-9](\d{2}){4}$/, "Le numéro de téléphone est invalide")
    .required("Le numéro de téléphone est requis."),
});

export const useUserResolver = () => useYupValidationResolver(validationSchema);
