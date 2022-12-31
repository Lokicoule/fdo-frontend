import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import { useTranslation } from "react-i18next";

import * as yup from "yup";

import { Form } from "~/components/Form/Form";
import { useAuth } from "~/libs/auth";
import { PASSWORD } from "../constants";

type LoginValues = {
  email: string;
  password: string;
};

type LoginFormProps = {
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

export const LoginForm: React.FunctionComponent<LoginFormProps> = (props) => {
  const { onSuccess } = props;

  const { t } = useTranslation(["auth"]);
  const { onLogin, error, isLoading } = useAuth();

  const handleSubmit = (data: LoginValues) => {
    onLogin(data.email, data.password).then(() => {
      onSuccess();
    });
  };

  return (
    <div>
      <Form<LoginValues, typeof schema> onSubmit={handleSubmit} schema={schema}>
        {({ control, formState }) => (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Form.InputField
                  name="email"
                  control={control}
                  label={t("login.fields.email.label")}
                  placeholder={t("login.fields.email.placeholder") ?? ""}
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
                  label={t("login.fields.password.label")}
                  placeholder={t("login.fields.password.placeholder") ?? ""}
                  required
                  fullWidth
                  autoComplete="current-password"
                  error={formState.errors["password"]}
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
              {t("login.actions.submit")}
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
