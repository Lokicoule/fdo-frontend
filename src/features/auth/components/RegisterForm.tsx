import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import { useTranslation } from "react-i18next";
import { object as YupObject, ref as YupRef, string as YupString } from "yup";

import { Form } from "~/components/Form/Form";
import { FormWrapper } from "~/components/Form/FormWrapper";
import { useAuth } from "~/providers/auth";

type RegisterValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

type RegisterFormProps = {
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
  confirmPassword: "",
} as RegisterValues;

export const RegisterForm: React.FunctionComponent<RegisterFormProps> = (
  props
) => {
  const { onSuccess } = props;

  console.info("RegisterForm", { props });

  const { t } = useTranslation();
  const { useRegister } = useAuth();
  const [{ error, isLoading }, onRegister] = useRegister();

  const handleSubmit = async (data: RegisterValues) => {
    onRegister(data.email, data.password).then(() => {
      onSuccess();
    });
  };

  return (
    <FormWrapper error={error}>
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
              {t("dictionary.register")}
            </Button>
          </>
        )}
      </Form>
    </FormWrapper>
  );
};
