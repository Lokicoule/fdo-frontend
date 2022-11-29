import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useTheme, Box, Avatar, Typography, Grid, Button } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LinkRouter } from "../../../../components";
import { FormInputText } from "../../../../components/Form/FormInputText";
import { useAuth } from "../../context/AuthContext";
import { useForgotPasswordResolver } from "./useForgotPasswordResolver";

type ForgotPasswordForm = {
  email: string;
};

export const ForgotPasswordContent = () => {
  const theme = useTheme();
  const [error, setError] = useState<Error | null>(null);
  const { onForgotPassword } = useAuth();
  const resolver = useForgotPasswordResolver();

  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<ForgotPasswordForm>({
    resolver,
  });

  const onSubmit = (data: ForgotPasswordForm) => {
    onForgotPassword(data.email).catch((e) => {
      setError(e);
    });
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
