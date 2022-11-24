import { useYupValidationResolver } from "form";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("L'adresse email est invalide")
    .required("L'adresse email est requise."),
  code: yup.string().required("Le code de vérification est requis."),
});

export const useConfirmRegisterResolver = () =>
  useYupValidationResolver(validationSchema);
