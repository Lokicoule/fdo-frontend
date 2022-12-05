import { Grid } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { FormInputText } from "../../../../components/Form/FormInputText";
import { SelectCountry } from "../../../../components/SelectCountry";
import * as yup from "yup";

export type AddressFormProps = {
  address: string;
  additionalAddress: string;
  city: string;
  country: string;
  zipCode: string;
};

type AddressFormContentProps = {};

export const addressValidationSchema = yup.object().shape({
  address: yup.string().required("L'adresse est requise."),
  additionalAddress: yup.string(),
  city: yup.string().required("La ville est requise."),
  country: yup.string().required("Le pays est requis."),
  zipCode: yup
    .string()
    .matches(/^[0-9]{5}$/)
    .required("Le code postal est requis."),
});

export const AddressFormContent: React.FC<AddressFormContentProps> = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<AddressFormProps>();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <SelectCountry
          name="country"
          label="Pays"
          required
          fullWidth
          error={Boolean(errors.country)}
          helperText={errors?.country?.message}
          control={control}
        />
      </Grid>
      <Grid item xs={12}>
        <FormInputText
          name="address"
          label="Address details"
          required
          fullWidth
          error={Boolean(errors.address)}
          helperText={errors.address?.message}
          control={control}
        />
      </Grid>
      <Grid item xs={12}>
        <FormInputText
          name="additionalAddress"
          label="Complément d'adresse"
          fullWidth
          error={Boolean(errors.additionalAddress)}
          helperText={errors.additionalAddress?.message}
          placeholder="Apt, suite, unité, nom de l'entreprise (facultatif)"
          control={control}
        />
      </Grid>

      <Grid item xs={4}>
        <FormInputText
          name="zipCode"
          label="Zip Code"
          required
          fullWidth
          error={Boolean(errors.zipCode)}
          helperText={errors.zipCode?.message}
          placeholder="40200"
          control={control}
        />
      </Grid>
      <Grid item xs={8}>
        <FormInputText
          name="city"
          label="City"
          required
          fullWidth
          error={Boolean(errors.city)}
          helperText={errors.city?.message}
          control={control}
        />
      </Grid>
    </Grid>
  );
};
