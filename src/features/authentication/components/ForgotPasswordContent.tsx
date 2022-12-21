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

import { FormInputText } from "~/components/Form/FormInputText";

import { useYupValidationResolver } from "~/hooks/useYupValidationResolver";
import { useAuthService } from "../hooks/useAuthService";

import { AUTH_ROUTES } from "../constants";

type FormProps = {
  email: string;
};

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("L'adresse email est invalide")
    .required("L'adresse email est requise."),
});

export const ForgotPasswordContent: React.FunctionComponent = () => {
  const { t } = useTranslation(["auth"]);
  const { onPasswordReset, error } = useAuthService();

  const methods = useForm<FormProps>({
    resolver: useYupValidationResolver(validationSchema),
  });

  const { control, handleSubmit, formState } = methods;
  const { errors } = formState;

  const onSubmit = async (data: FormProps) => {
    await onPasswordReset(data.email);
  };

  return (
    <Container maxWidth="sm">
      <Paper
        sx={{
          p: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        elevation={5}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t("forgot_password.title")}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormInputText
                name="email"
                control={control}
                label={t("forgot_password.fields.email.label")}
                placeholder={
                  t("forgot_password.fields.email.placeholder") ?? ""
                }
                required
                fullWidth
                autoComplete="email"
                error={!!errors.email}
                fieldError={errors.email?.message}
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
            {t("forgot_password.actions.submit")}
          </Button>
          {error && (
            <Alert severity="error" sx={{ mt: 1 }}>
              {error.message}
            </Alert>
          )}
          <Grid container>
            <Grid
              item
              xs={12}
              sx={{
                mt: 1,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Link
                sx={{
                  textDecoration: "none",
                  ":hover": {
                    textDecoration: "underline",
                  },
                }}
                href={AUTH_ROUTES.LOGIN}
                variant="body2"
              >
                {t("forgot_password.actions.remembered_password")}
              </Link>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                mt: 1,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Link
                sx={{
                  textDecoration: "none",
                  ":hover": {
                    textDecoration: "underline",
                  },
                }}
                href={AUTH_ROUTES.REGISTER}
                variant="body2"
              >
                {t("forgot_password.actions.no_account")}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};
