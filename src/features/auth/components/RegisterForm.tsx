import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import { useTranslation } from "react-i18next";
import { object as YupObject, ref as YupRef, string as YupString } from "yup";

import { Form } from "~/components/Form/Form";
import { useAuth } from "~/libs/auth";
import { PASSWORD } from "../constants";

type RegisterValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

type RegisterFormProps = {
  onSuccess: () => void;
};

const schema = YupObject().shape({
  email: YupString()
    .email("L'adresse email est invalide")
    .required("L'adresse email est requise."),
  password: YupString()
    .min(
      PASSWORD.MIN_LENGTH,
      `Le mot de passe doit comporter au moins ${PASSWORD.MIN_LENGTH} charactères.`
    )
    .max(
      PASSWORD.MAX_LENGTH,
      `Le mot de passe doit contenir ${PASSWORD.MAX_LENGTH} charactères maximum.`
    )
    .required("Le mot de passe est requis."),
  confirmPassword: YupString().oneOf(
    [YupRef("password"), null],
    "Les mots de passes ne correspondent pas."
  ),
});

const defaultValues = {
  email: "",
  password: "",
  confirmPassword: "",
} as RegisterValues;

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
        options={{ defaultValues }}
      >
        {({ control, formState }) => (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Form.InputField
                  name="email"
                  control={control}
                  label={t("common.fields.email.label")}
                  placeholder={t("common.fields.email.placeholder") ?? ""}
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
                  label={t("common.fields.password.label")}
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
                  label={t("common.fields.password_confirmation.label")}
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
              {t("register.submit")}
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
