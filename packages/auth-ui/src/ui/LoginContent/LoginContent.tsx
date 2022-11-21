import { yupResolver } from "@hookform/resolvers/yup";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import { FormInputSecret, FormInputText } from "form";
import { useForm } from "react-hook-form";
import { LinkRouter } from "ui";
import { useAuth } from "auth-provider";

import schema from "./login.schema";

type SignInForm = {
  email: string;
  password: string;
};

export const LoginContent = () => {
  const auth = useAuth();
  const form = useForm<SignInForm>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const { formState, handleSubmit, control } = form;
  const { errors } = formState;

  const onSubmit = async (data: SignInForm) => {
    console.log("updated2");
    await auth.onLogin(data.email, data.password);
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
              helperText={errors.email?.message}
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
              helperText={errors.password?.message}
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
