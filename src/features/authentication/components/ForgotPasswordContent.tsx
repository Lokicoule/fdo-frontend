import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Avatar, Box, Button, Grid, Typography, useTheme } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { LinkRouter } from "../../../components";
import { FormInputText } from "../../../components/Form/FormInputText";
import { useYupValidationResolver } from "../../../hooks/useYupValidationResolver";
import { useFacadePasswordReset } from "../hooks/useFacadePasswordReset";

type ForgotPasswordForm = {
  email: string;
};

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("L'adresse email est invalide")
    .required("L'adresse email est requise."),
});

const useForgotPasswordResolver = () =>
  useYupValidationResolver(validationSchema);

export const ForgotPasswordContent = () => {
  const theme = useTheme();
  const resolver = useForgotPasswordResolver();
  const { onPasswordReset, error } = useFacadePasswordReset();

  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<ForgotPasswordForm>({
    resolver,
  });

  const onSubmit = async (data: ForgotPasswordForm) => {
    await onPasswordReset(data.email);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Forgot password
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
              helperText={errors.email?.message}
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
          Forgot password
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
    </Box>
  );
};

export default ForgotPasswordContent;
