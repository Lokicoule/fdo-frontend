import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import { useTranslation } from "react-i18next";

import { object as YupObject, string as YupString } from "yup";

import { Form } from "~/components/Form/Form";
import { FormWrapper } from "~/components/Form/FormWrapper";
import { useAuth } from "~/libs/auth";

type ForgotPasswordValues = {
  email: string;
};

type ForgotPasswordFormProps = {
  onSuccess: () => void;
};

const schema = YupObject().shape({
  email: YupString().email().required(),
});

const defaultValues = {
  email: "",
} satisfies ForgotPasswordValues;

export const ForgotPasswordForm: React.FunctionComponent<
  ForgotPasswordFormProps
> = (props) => {
  const { onSuccess } = props;

  const { t } = useTranslation();
  const { onForgotPassword, error, isLoading } = useAuth();

  const handleSubmit = (data: ForgotPasswordValues) => {
    onForgotPassword(data.email).then(() => {
      onSuccess();
    });
  };

  return (
    <FormWrapper error={error}>
      <Form<ForgotPasswordValues, typeof schema>
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
                  error={formState.errors["email"]}
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
              {t("dictionary.sendCode")}
            </Button>
          </>
        )}
      </Form>
    </FormWrapper>
  );
};
