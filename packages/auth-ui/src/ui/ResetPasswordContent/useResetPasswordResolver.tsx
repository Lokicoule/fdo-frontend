import { useYupValidationResolver } from "form";
import { useMemo } from "react";
import * as yup from "yup";
import { PASSWORD_RULES } from "../../constants/password.rules";

export const useResetPasswordResolver = () => {
  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        email: yup
          .string()
          .email("L'adresse email est invalide")
          .required("L'adresse email est requise."),
        code: yup.string().required("Le code de vérification est requis."),
        password: yup
          .string()
          .min(
            PASSWORD_RULES.MIN_LENGTH,
            `Le mot de passe doit comporter au moins ${PASSWORD_RULES.MIN_LENGTH} charactères.`
          )
          .max(
            PASSWORD_RULES.MAX_LENGTH,
            `Le mot de passe doit contenir ${PASSWORD_RULES.MAX_LENGTH} charactères maximum.`
          )
          .required("Le mot de passe est requis."),
        confirmPassword: yup
          .string()
          .oneOf(
            [yup.ref("password"), null],
            "Les mots de passes ne correspondent pas."
          ),
      }),
    []
  );

  return useYupValidationResolver(validationSchema);
};
