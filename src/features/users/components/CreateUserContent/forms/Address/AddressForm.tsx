import { Box, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { FormInputText } from "../../../../../../components/Form/FormInputText";
import { useCreateUser } from "../../CreateUserContext";

import { useUserResolver } from "./useAddressResolver";

export type AddressFormProps = {
  street: string;
  number: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};

type AddressFormContentProps = {
  onSubmit: () => void;
  render: JSX.Element;
};

export const AddressFormContent: React.FC<AddressFormContentProps> = (
  props
) => {
  const { render } = props;
  const { onAddressSubmit, address } = useCreateUser();

  const resolver = useUserResolver();
  const { formState, handleSubmit, control } = useForm<AddressFormProps>({
    defaultValues: { ...address },
    resolver,
  });
  const { errors } = formState;

  const onSubmit = async (data: AddressFormProps) => {
    onAddressSubmit(data);
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
        <Grid item xs={12}>
          <FormInputText
            name="street"
            control={control}
            label="Street"
            required
            fullWidth
            autoFocus
            error={!!errors.street}
            helperText={errors.street?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <FormInputText
            name="number"
            control={control}
            label="Number"
            required
            fullWidth
            autoFocus
            error={!!errors.number}
            helperText={errors.number?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <FormInputText
            name="city"
            control={control}
            label="City"
            required
            fullWidth
            autoFocus
            error={!!errors.city}
            helperText={errors.city?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <FormInputText
            name="state"
            control={control}
            label="State"
            required
            fullWidth
            autoFocus
            error={!!errors.state}
            helperText={errors.state?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <FormInputText
            name="zipCode"
            control={control}
            label="Zip Code"
            required
            fullWidth
            autoFocus
            error={!!errors.zipCode}
            helperText={errors.zipCode?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <FormInputText
            name="country"
            control={control}
            label="Country"
            required
            fullWidth
            autoFocus
            error={!!errors.country}
            helperText={errors.country?.message}
          />
        </Grid>
      </Grid>
      {render}
    </Box>
  );
};
