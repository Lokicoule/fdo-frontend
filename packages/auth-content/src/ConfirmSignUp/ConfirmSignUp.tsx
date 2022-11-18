import { yupResolver } from "@hookform/resolvers/yup";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Avatar, Box, Button, Grid, Typography, useTheme } from "@mui/material";
import { useAuth } from "auth-context/auth-routing";
import { FormInputText } from "form";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LinkRouter } from "ui";

import schema from "./validation/confirm-sign-up.validation";

type ConfirmSignUpForm = {
  email: string;
  code: string;
};

export const ConfirmSignUp = () => {
  const auth = useAuth();
  const theme = useTheme();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ConfirmSignUpForm>({
    defaultValues: {
      email: "",
      code: "",
    },
    resolver: yupResolver(schema),
  });

  const { formState, handleSubmit, control } = form;
  const { errors } = formState;

  const onSubmit = async (data: ConfirmSignUpForm) => {
    auth.onConfirmRegister(data.email, data.code).catch((err) => {
      console.log(err);
      setError(err.message);
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
        Confirmation
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
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
        >
          Confirmer
        </Button>
        <Typography color={theme.palette.error.main}>
          {error && error}
        </Typography>
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
