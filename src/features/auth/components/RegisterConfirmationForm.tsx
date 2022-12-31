import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import { useTranslation } from "react-i18next";

import * as yup from "yup";

import { Form } from "~/components/Form/Form";
import { useAuth } from "~/libs/auth";

type RegisterConfirmationValues = {
  email: string;
  code: string;
};

type LoginFormProps = {
  onSuccess: () => void;
};

const schema = yup.object().shape({
  email: yup
    .string()
    .email("L'adresse email est invalide")
    .required("L'adresse email est requise."),
  code: yup.string().required("Le code de vérification est requis."),
});

export const RegisterConfirmationForm: React.FunctionComponent<
  LoginFormProps
> = (props) => {
  const { onSuccess } = props;

  const { t } = useTranslation(["auth"]);
  const { onRegisterConfirmation, error, isLoading } = useAuth();

  const handleSubmit = async (data: RegisterConfirmationValues) => {
    onRegisterConfirmation(data.email, data.code).then(onSuccess);
  };

  return (
    <div>
      <Form<RegisterConfirmationValues, typeof schema>
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
                  label={t("register-confirmation.fields.email.label")}
                  placeholder={
                    t("register-confirmation.fields.email.placeholder") ?? ""
                  }
                  required
                  fullWidth
                  autoComplete="email"
                  error={formState.errors["email"]}
                />
              </Grid>
              <Grid item xs={12}>
                <Form.InputField
                  name="code"
                  control={control}
                  label={t("register-confirmation.fields.code.label")}
                  placeholder={
                    t("register-confirmation.fields.code.placeholder") ?? ""
                  }
                  required
                  fullWidth
                  error={formState.errors["code"]}
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
              {t("register-confirmation.actions.submit")}
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
