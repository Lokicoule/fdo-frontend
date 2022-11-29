import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useTheme, Box, Avatar, Typography, Grid, Button } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { LinkRouter } from "../../../../components";
import { FormInputText } from "../../../../components/Form/FormInputText";
import { useAuth } from "../../context/AuthContext";
import { useConfirmRegisterResolver } from "./useConfirmRegisterResolver";

type ConfirmSignUpForm = {
  email: string;
  code: string;
};

export const ConfirmRegisterContent = () => {
  const [error, setError] = React.useState<Error | null>(null);

  const theme = useTheme();
  const { onConfirmRegister } = useAuth();
  const resolver = useConfirmRegisterResolver();

  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<ConfirmSignUpForm>({
    resolver,
  });

  const onSubmit = (data: ConfirmSignUpForm) => {
    onConfirmRegister(data.email, data.code).catch((e) => {
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
        {error && (
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
