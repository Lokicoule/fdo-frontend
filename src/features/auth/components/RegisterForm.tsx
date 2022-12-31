import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { useTranslation } from "react-i18next";

import { useForm } from "react-hook-form";
import * as yup from "yup";

import { FormInputSecret } from "~/components/Form/FormInputSecret";
import { FormInputText } from "~/components/Form/FormInputText";

import { useYupValidationResolver } from "~/hooks/useYupValidationResolver";
import { useAuth } from "~/libs/auth";
import { Form } from "~/components/Form/Form";
import { PASSWORD } from "../constants";

type RegisterValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

type RegisterFormProps = {
  onSuccess: () => void;
};

const schema = yup.object().shape({
  email: yup
    .string()
    .email("L'adresse email est invalide")
    .required("L'adresse email est requise."),
  password: yup
    .string()
    .min(
      PASSWORD.MIN_LENGTH,
      `Le mot de passe doit comporter au moins ${PASSWORD.MIN_LENGTH} charactères.`
    )
    .max(
      PASSWORD.MAX_LENGTH,
      `Le mot de passe doit contenir ${PASSWORD.MAX_LENGTH} charactères maximum.`
    )
    .required("Le mot de passe est requis."),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "Les mots de passes ne correspondent pas."
    ),
});

export const RegisterForm: React.FunctionComponent<RegisterFormProps> = (
  props
) => {
  const { onSuccess } = props;

  const { t } = useTranslation(["auth"]);
  const { onRegister, error, isLoading } = useAuth();

  const handleSubmit = async (data: RegisterValues) => {
    onRegister(data.email, data.password).then(() => {
      onSuccess();
    });
  };

  return (
    <div>
      <Form<RegisterValues, typeof schema>
        onSubmit={handleSubmit}
        schema={schema}
      >
        {({ control, formState }) => (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Form.InputField
                  name="email"
                  control={control}
                  label={t("register.fields.email.label")}
                  placeholder={t("register.fields.email.placeholder") ?? ""}
                  required
                  fullWidth
                  autoComplete="email"
                  autoFocus
                  error={formState.errors["email"]}
                />
              </Grid>
              <Grid item xs={12}>
                <Form.SecretField
                  name="password"
                  control={control}
                  label={t("register.fields.password.label")}
                  placeholder={t("register.fields.password.placeholder") ?? ""}
                  required
                  fullWidth
                  autoComplete="current-password"
                  error={formState.errors["password"]}
                />
              </Grid>
              <Grid item xs={12}>
                <Form.SecretField
                  name="confirmPassword"
                  control={control}
                  label={t("register.fields.password_confirmation.label")}
                  placeholder={
                    t("register.fields.password_confirmation.placeholder") ?? ""
                  }
                  required
                  fullWidth
                  error={formState.errors["confirmPassword"]}
                />
              </Grid>
            </Grid>
            <Button
              disabled={isLoading}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              {t("register.actions.submit")}
            </Button>
          </>
        )}
      </Form>
      {error?.message && (
        <Alert severity="error" sx={{ mt: 1 }}>
          {error.message}
        </Alert>
      )}
    </div>
  );
};
