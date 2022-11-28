import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FormInputSecret, FormInputText } from "form";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { LinkRouter } from "ui";
import { useAuth } from "auth-provider";
import { useResetPasswordResolver } from "./useResetPasswordResolver";

type ResetPasswordForm = {
  email: string;
  code: string;
  password: string;
  confirmPassword: string;
};

export const ResetPasswordContent = () => {
  const theme = useTheme();
  const {
    resetPassword: { onResetPassword, error },
  } = useAuth();

  const resolver = useResetPasswordResolver();

  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<ResetPasswordForm>({
    resolver,
  });

  const onSubmit = async (data: ResetPasswordForm) => {
    await onResetPassword(data.email, data.code, data.password);
  };

  useEffect(() => {
    return () => {
      error.reset();
    };
  }, []);

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
        New password
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
          <Grid item xs={12}>
            <FormInputText
              name="code"
              control={control}
              label="Code de confirmation"
              required
              fullWidth
              autoComplete="current-password"
              error={!!errors.code}
              helperText={errors.code?.message}
            ></FormInputText>
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
              helperText={errors.password?.message}
            ></FormInputSecret>
          </Grid>
          <Grid item xs={12}>
            <FormInputSecret
              name="confirmPassword"
              control={control}
              label="Confirmation de mot de passe"
              required
              fullWidth
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
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
          New password
        </Button>
        {error.message && (
          <Typography color={theme.palette.error.main}>
            {error.message}
          </Typography>
        )}
        <Grid container justifyContent="flex-end">
          <Grid item>
            <LinkRouter to="/auth/sign-in" variant="body2">
              Already have an account? Sign in
            </LinkRouter>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
