import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import { useTranslation } from "react-i18next";

import { object as YupObject, ref as YupRef, string as YupString } from "yup";

import { Form } from "~/components/Form/Form";
import { FormWrapper } from "~/components/Form/FormWrapper";
import { useAuth } from "~/libs/auth";

type ForgotPasswordConfirmationValues = {
  email: string;
  code: string;
  password: string;
  confirmPassword: string;
};

type ForgotPasswordConfirmationFormProps = {
  onSuccess: () => void;
};

const schema = YupObject().shape({
  email: YupString().email().required(),
  code: YupString().required(),
  password: YupString().min(8).max(128).required(),
  confirmPassword: YupString()
    .required()
    .oneOf([YupRef("password"), null], "validations:password.notMatch"),
});

const defaultValues = {
  email: "",
  code: "",
  password: "",
  confirmPassword: "",
} satisfies ForgotPasswordConfirmationValues;

export const ForgotPasswordConfirmationForm: React.FunctionComponent<
  ForgotPasswordConfirmationFormProps
> = (props) => {
  const { onSuccess } = props;

  console.info("ForgotPasswordConfirmationForm", { props });

  const { t } = useTranslation();
  const { onForgotPasswordConfirmation, error, isLoading } = useAuth();

  const handleSubmit = (data: ForgotPasswordConfirmationValues) => {
    onForgotPasswordConfirmation(data.email, data.code, data.password).then(
      () => {
        onSuccess();
      }
    );
  };

  return (
    <FormWrapper error={error}>
      <Form<ForgotPasswordConfirmationValues, typeof schema>
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
                  label={t("dictionary.email")}
                  required
                  fullWidth
                  autoComplete="email"
                  autoFocus
                  error={formState.errors["email"]}
                />
              </Grid>
              <Grid item xs={12}>
                <Form.InputField
                  name="code"
                  control={control}
                  label={t("dictionary.code")}
                  required
                  fullWidth
                  error={formState.errors["code"]}
                />
              </Grid>
              <Grid item xs={12}>
                <Form.SecretField
                  name="password"
                  control={control}
                  label={t("dictionary.password")}
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
                  label={t("dictionary.confirmPassword")}
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
              {t("dictionary.confirm")}
            </Button>
          </>
        )}
      </Form>
    </FormWrapper>
  );
};
