import Grid from "@mui/material/Grid";

import { useFormContext } from "react-hook-form";
import * as yup from "yup";

import { FormInputText } from "../../../../../components/Form/FormInputText";
import { useEmail } from "../../../../authentication";

type FormProps = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

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
    .matches(
      /^(\+33|0)[1-9]\s?(\d{2}\s?){4}$/,
      "Le numéro de téléphone est invalide"
    )
    .required("Le numéro de téléphone est requis."),
});

const UserFormContent: React.FunctionComponent = () => {
  const email = useEmail();

  const {
    control,
    formState: { errors },
  } = useFormContext<FormProps>();

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <FormInputText
          name="firstName"
          control={control}
          label="Prénom"
          required
          fullWidth
          autoComplete="firstName"
          error={!!errors.firstName}
          fieldError={errors.firstName?.message}
        />
      </Grid>
      <Grid item xs={6}>
        <FormInputText
          name="lastName"
          control={control}
          label="Nom"
          required
          fullWidth
          autoComplete="lastName"
          error={!!errors.lastName}
          fieldError={errors.lastName?.message}
        />
      </Grid>
      <Grid item xs={12}>
        <FormInputText
          disabled={Boolean(email)}
          name="email"
          control={control}
          label="Email"
          required
          fullWidth
          autoComplete="email"
          error={!!errors.email}
          fieldError={errors.email?.message}
        />
      </Grid>
      <Grid item xs={12}>
        <FormInputText
          name="phone"
          control={control}
          label="Phone"
          required
          fullWidth
          autoComplete="phone"
          error={!!errors.phone}
          fieldError={errors.phone?.message}
        />
      </Grid>
    </Grid>
  );
};

export type { FormProps as UserFormProps };
export { UserFormContent, validationSchema as UserFormValidationSchema };
