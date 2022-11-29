import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Avatar, Box, Button, Grid, Typography, useTheme } from "@mui/material";
import { Resolver, useForm } from "react-hook-form";
import { LinkRouter } from "../../../../components";
import { FormInputText } from "../../../../components/Form/FormInputText";
import { useConfirmRegisterResolver } from "./useConfirmRegisterResolver";
import { useFacadeSignUpConfirmation } from "./useFacadeSignUpConfirmation";

type ConfirmSignUpForm = {
  email: string;
  code: string;
};

export const ConfirmRegisterContent = () => {
  const theme = useTheme();
  const resolver = useConfirmRegisterResolver();
  const { onSignUpConfirmation, error } = useFacadeSignUpConfirmation();

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
