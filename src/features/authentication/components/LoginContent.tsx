import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

import { useTranslation } from "react-i18next";

import { useForm } from "react-hook-form";
import * as yup from "yup";

import { FormInputSecret } from "~/components/Form/FormInputSecret";
import { FormInputText } from "~/components/Form/FormInputText";

import { useYupValidationResolver } from "~/hooks/useYupValidationResolver";
import { useAuthService } from "../hooks/useAuthService";

import { PASSWORD_RULES } from "../constants/password.constants";
import { AUTH_ROUTES } from "../constants";

type FormProps = {
  email: string;
  password: string;
};

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("L'adresse email est invalide")
    .required("L'adresse email est requise."),
  password: yup
    .string()
    .min(
      PASSWORD_RULES.MIN_LENGTH,
      `Le mot de passe doit comporter au moins ${PASSWORD_RULES.MIN_LENGTH} charactères.`
    )
    .max(
      PASSWORD_RULES.MAX_LENGTH,
      `Le mot de passe doit contenir ${PASSWORD_RULES.MAX_LENGTH} charactères maximum.`
    )
    .required("Le mot de passe est requis."),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "Les mots de passes ne correspondent pas."
    ),
});

export const LoginContent: React.FunctionComponent = () => {
  const { t } = useTranslation(["auth"]);
  const { onLogin, error } = useAuthService();

  const methods = useForm<FormProps>({
    resolver: useYupValidationResolver(validationSchema),
  });

  const { control, handleSubmit, formState } = methods;
  const { errors } = formState;

  const onSubmit = async (data: FormProps) => {
    await onLogin(data.email, data.password);
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
          {t("login.title")}
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
                label={t("login.fields.email.label")}
                placeholder={t("login.fields.email.placeholder") ?? ""}
                required
                fullWidth
                autoComplete="email"
                autoFocus
                error={!!errors.email}
                fieldError={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputSecret
                name="password"
                control={control}
                label={t("login.fields.password.label")}
                placeholder={t("login.fields.password.placeholder") ?? ""}
                required
                fullWidth
                autoComplete="current-password"
                error={!!errors.password}
                fieldError={errors.password?.message}
              ></FormInputSecret>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            {t("login.actions.submit")}
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
                href={AUTH_ROUTES.REGISTER}
                variant="body2"
              >
                {t("login.actions.no_account")}
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
                href={AUTH_ROUTES.FORGOT_PASSWORD}
                variant="body2"
              >
                {t("login.actions.forgot_password")}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};
