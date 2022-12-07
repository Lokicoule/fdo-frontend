import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { LinkRouter } from "../../../components";
import { FormInputSecret } from "../../../components/Form/FormInputSecret";
import { FormInputText } from "../../../components/Form/FormInputText";
import { useYupValidationResolver } from "../../../hooks/useYupValidationResolver";
import { PASSWORD_RULES } from "../constants/password.constants";
import { useAuthService } from "../hooks/useAuthService";

type LoginForm = {
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

const useLoginResolver = () => useYupValidationResolver(validationSchema);

export const LoginContent = () => {
  const theme = useTheme();
  const { onLogin, error } = useAuthService();

  const resolver = useLoginResolver();
  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<LoginForm>({
    resolver,
  });

  const onSubmit = async (data: LoginForm) => {
    await onLogin(data.email, data.password);
  };

  return (
    <Container maxWidth="md">
      <Paper
        sx={{
          p: 2,
          m: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Connexion
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
                label="Email"
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
                label="Mot de passe"
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
            Login
          </Button>
          {error && (
            <Typography color={theme.palette.error.main}>
              {error.message}
            </Typography>
          )}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <LinkRouter to="/auth/sign-up" variant="body2">
                Vous n&#39;avez pas de compte ? Inscrivez-vous
              </LinkRouter>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};
