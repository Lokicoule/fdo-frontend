import * as yup from "yup";
import { AUTH_CONSTANTS } from "../../constants/auth.constants";

export default yup.object().shape({
  email: yup
    .string()
    .email("L'adresse email est invalide")
    .required("L'adresse email est requise."),
  password: yup
    .string()
    .min(
      AUTH_CONSTANTS.PASSWORD.MIN_LENGTH,
      `Le mot de passe doit comporter au moins ${AUTH_CONSTANTS.PASSWORD.MIN_LENGTH} charactères.`
    )
    .max(
      AUTH_CONSTANTS.PASSWORD.MAX_LENGTH,
      `Le mot de passe doit contenir ${AUTH_CONSTANTS.PASSWORD.MAX_LENGTH} charactères maximum.`
    )
    .required("Le mot de passe est requis."),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "Les mots de passes ne correspondent pas."
    ),
});
