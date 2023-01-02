import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { FieldError } from "react-hook-form";

import { useTranslation } from "react-i18next";

import { object as YupObject, ref as YupRef, string as YupString } from "yup";

import { Form } from "~/components/Form/Form";
import { useAuth } from "~/libs/auth";
import {
  CODE_FIELD,
  EMAIL_FIELD,
  ERROR_TYPES,
  PASSWORD,
  PASSWORD_CONFIRM_FIELD,
  PASSWORD_FIELD,
} from "../constants";

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
  password: YupString()
    .min(PASSWORD.MIN_LENGTH)
    .max(PASSWORD.MAX_LENGTH)
    .required(),
  confirmPassword: YupString()
    .required()
    .oneOf([YupRef("password"), null]),
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

  const { t } = useTranslation(["auth"]);
  const { onForgotPasswordConfirmation, error, isLoading } = useAuth();

  const handleSubmit = (data: ForgotPasswordConfirmationValues) => {
    onForgotPasswordConfirmation(data.email, data.code, data.password).then(
      () => {
        onSuccess();
      }
    );
  };

  return (
    <div>
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
                  label={"email"}
                  /* placeholder={t(EMAIL_FIELD.placeholder, {
                    defaultValue: undefined,
                  })} */
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
                  label={t("common.fields.code.label")}
                  placeholder={t("common.fields.code.placeholder") ?? ""}
                  required
                  fullWidth
                  error={formState.errors["code"]}
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
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              {t("forgot_password_confirmation.submit")}
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
