import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import { useTranslation } from "react-i18next";

import { object as YupObject, ref as YupRef, string as YupString } from "yup";

import { Form } from "~/components/Form/Form";
import { FormWrapper } from "~/components/Form/FormWrapper";
import { useAuth } from "~/providers/auth";
import { useNotify } from "~/stores/notifications";

type LoginValues = {
  email: string;
  password: string;
};

type LoginFormProps = {
  onSuccess: () => void;
};

const schema = YupObject().shape({
  email: YupString().email().required(),
  password: YupString().min(8).max(128).required(),
  confirmPassword: YupString().oneOf(
    [YupRef("password"), null],
    "validations:password.notMatch"
  ),
});

const defaultValues = {
  email: "",
  password: "",
} satisfies LoginValues;

export const LoginForm: React.FunctionComponent<LoginFormProps> = (props) => {
  const { onSuccess } = props;

  console.info("LoginForm", { props });

  const { t } = useTranslation();
  const { useLogin } = useAuth();
  const [{ error, isLoading }, onLogin] = useLogin();
  const notify = useNotify();

  const handleSubmit = (data: LoginValues) => {
    onLogin(data.email, data.password).then(() => {
      onSuccess();
      notify.info({
        title: "Login successful",
        message: `Welcome back ${data.email}`,
      });
    });
  };

  return (
    <FormWrapper error={error}>
      <Form<LoginValues, typeof schema>
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
            </Grid>
            <Button
              disabled={isLoading}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              {t("dictionary.login")}
            </Button>
          </>
        )}
      </Form>
    </FormWrapper>
  );
};
