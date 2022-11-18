import { yupResolver } from "@hookform/resolvers/yup";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import { useAuth } from "auth-context/auth-routing";
import { FormInputSecret, FormInputText } from "form";
import { useForm } from "react-hook-form";
import { LinkRouter } from "ui";
import schema from "./validation/sign-up.validation";

type SignUpForm = {
  email: string;
  password: string;
  confirmPassword: string;
};

export const SignUp = () => {
  const auth = useAuth();
  const form = useForm<SignUpForm>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(schema),
  });

  const { formState, handleSubmit, control } = form;
  const { errors } = formState;

  const onSubmit = async (data: SignUpForm) => {
    await auth.onRegister(data.email, data.password);
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
        Enregistrement
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
          Create account
        </Button>

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
