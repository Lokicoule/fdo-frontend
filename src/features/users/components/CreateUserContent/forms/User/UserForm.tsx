import { Box, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { FormInputText } from "../../../../../../components/Form/FormInputText";
import { useEmail } from "../../../../../authentication/stores/authStore";
import { useCreateUser } from "../../CreateUserContext";

import { useUserResolver } from "./useUserResolver";

export type UserFormProps = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

type UserFormContentProps = {
  onSubmit: () => void;
  render: JSX.Element;
};

export const UserFormContent: React.FC<UserFormContentProps> = (props) => {
  const { render } = props;
  const { onUserSubmit, user } = useCreateUser();
  const email = useEmail();
  const resolver = useUserResolver();
  const { formState, handleSubmit, control } = useForm<UserFormProps>({
    defaultValues: {
      ...user,
      email: email ?? "",
    },
    resolver,
  });
  const { errors } = formState;

  const onSubmit = async (data: UserFormProps) => {
    onUserSubmit(data);
    props.onSubmit();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ mt: 3 }}
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormInputText
            name="firstName"
            control={control}
            label="Prénom"
            required
            fullWidth
            autoComplete="firstName"
            autoFocus
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />
        </Grid>
        <Grid item xs={6}>
          <FormInputText
            name="lastName"
            control={control}
            label="Nom"
            required
            fullWidth
            autoComplete="lastName"
            autoFocus
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <FormInputText
            disabled={Boolean(email)}
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
            name="phone"
            control={control}
            label="Phone"
            required
            fullWidth
            autoComplete="phone"
            autoFocus
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />
        </Grid>
      </Grid>
      {render}
    </Box>
  );
};
