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
import { FormInputText } from "../../../components/Form/FormInputText";
import { useYupValidationResolver } from "../../../hooks/useYupValidationResolver";
import { useAuthService } from "../hooks/useAuthService";

type ConfirmSignUpForm = {
  email: string;
  code: string;
};

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("L'adresse email est invalide")
    .required("L'adresse email est requise."),
  code: yup.string().required("Le code de vérification est requis."),
});

const useConfirmRegisterResolver = () =>
  useYupValidationResolver(validationSchema);

export const ConfirmRegisterContent = () => {
  const theme = useTheme();
  const resolver = useConfirmRegisterResolver();
  const { onSignUpConfirmation, error } = useAuthService();

  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<ConfirmSignUpForm>({
    resolver,
  });

  const onSubmit = async (data: ConfirmSignUpForm) => {
    await onSignUpConfirmation(data.email, data.code);
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
                error={!!errors.email}
                fieldError={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                name="code"
                control={control}
                label="Code de confirmation"
                required
                fullWidth
                error={!!errors.code}
                fieldError={errors.code?.message}
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
      </Paper>
    </Container>
  );
};
