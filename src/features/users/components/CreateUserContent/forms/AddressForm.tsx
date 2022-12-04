import { Box, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { FormInputText } from "../../../../../components/Form/FormInputText";
import { SelectCountry } from "../../../../../components/SelectCountry";
import { useYupValidationResolver } from "../../../../../hooks/useYupValidationResolver";
import { useCreateUser } from "../CreateUserContext";

export type AddressFormProps = {
  address: string;
  additionalAddress: string;
  city: string;
  country: string;
  zipCode: string;
};

type AddressFormContentProps = {
  onSubmit: () => void;
  renderButtons: JSX.Element;
};

const validationSchema = yup.object().shape({
  address: yup.string().required("L'adresse est requise."),
  additionalAddress: yup.string(),
  city: yup.string().required("La ville est requise."),
  country: yup.string().required("Le pays est requis."),
  zipCode: yup
    .string()
    .matches(/^[0-9]{5}$/)
    .required("Le code postal est requis."),
});

const useUserResolver = () => useYupValidationResolver(validationSchema);

export const AddressFormContent: React.FC<AddressFormContentProps> = (
  props
) => {
  const { renderButtons } = props;
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
          <SelectCountry
            name="country"
            control={control}
            label="Pays"
            required
            fullWidth
            error={!!errors.country}
            helperText={errors.country?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <FormInputText
            name="address"
            control={control}
            label="Address details"
            required
            fullWidth
            error={Boolean(errors.address)}
            helperText={errors.address?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <FormInputText
            name="additionalAddress"
            control={control}
            label="Complément d'adresse"
            fullWidth
            error={Boolean(errors.additionalAddress)}
            helperText={errors.additionalAddress?.message}
            placeholder="Apt, suite, unité, nom de l'entreprise (facultatif)"
          />
        </Grid>

        <Grid item xs={4}>
          <FormInputText
            name="zipCode"
            control={control}
            label="Zip Code"
            required
            fullWidth
            error={Boolean(errors.zipCode)}
            helperText={errors.zipCode?.message}
            placeholder="40200"
          />
        </Grid>
        <Grid item xs={8}>
          <FormInputText
            name="city"
            control={control}
            label="City"
            required
            fullWidth
            error={Boolean(errors.city)}
            helperText={errors.city?.message}
          />
        </Grid>
      </Grid>
      {renderButtons}
    </Box>
  );
};
