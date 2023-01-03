import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import { useTranslation } from "react-i18next";

import { object as YupObject, string as YupString } from "yup";

import { Form } from "~/components/Form/Form";
import { FormWrapper } from "~/components/Form/FormWrapper";
import { useAuth } from "~/providers/auth";

type RegisterConfirmationValues = {
  email: string;
  code: string;
};

type LoginFormProps = {
  onSuccess: () => void;
};

const schema = YupObject().shape({
  email: YupString().email().required(),
  code: YupString().required(),
});

const defaultValues = {
  email: "",
  code: "",
} satisfies RegisterConfirmationValues;

export const RegisterConfirmationForm: React.FunctionComponent<
  LoginFormProps
> = (props) => {
  const { onSuccess } = props;

  const { t } = useTranslation();
  const { useRegisterConfirmation } = useAuth();
  const [{ error, isLoading }, onRegisterConfirmation] =
    useRegisterConfirmation();

  const handleSubmit = async (data: RegisterConfirmationValues) => {
    onRegisterConfirmation(data.email, data.code).then(onSuccess);
  };

  return (
    <FormWrapper error={error}>
      <Form<RegisterConfirmationValues, typeof schema>
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
