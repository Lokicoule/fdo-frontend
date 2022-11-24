import { useYupValidationResolver } from "form";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("L'adresse email est invalide")
    .required("L'adresse email est requise."),
});

export const useForgotPasswordResolver = () =>
  useYupValidationResolver(validationSchema);
