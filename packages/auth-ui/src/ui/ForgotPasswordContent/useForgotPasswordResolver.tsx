import { useYupValidationResolver } from "form";
import { useMemo } from "react";
import * as yup from "yup";

export const useForgotPasswordResolver = () => {
  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        email: yup
          .string()
          .email("L'adresse email est invalide")
          .required("L'adresse email est requise."),
      }),
    []
  );

  return useYupValidationResolver(validationSchema);
};
