import { Box, Grid } from "@mui/material";
import { FormInputText } from "form";
import { useForm } from "react-hook-form";
import { useCreateUser } from "../../CreateUserContext";

import { useCompanyResolver } from "./useCompanyResolver";

export type CompanyFormProps = {
  name: string;
  vatNumber: string;
  rcsNumber: string;
  siren: string;
  siret: string;
};

type CompanyFormContentProps = {
  onSubmit: () => void;
  render: JSX.Element;
};

export const CompanyFormContent: React.FC<CompanyFormContentProps> = (
  props
) => {
  const { render } = props;
  const { onCompanySubmit, company, user } = useCreateUser();

  const resolver = useCompanyResolver();
  const { formState, handleSubmit, control } = useForm<CompanyFormProps>({
    defaultValues: { ...company },
    resolver,
  });
  const { errors } = formState;

  const onSubmit = async (data: CompanyFormProps) => {
    console.log(data);
    console.log("user", user);
    onCompanySubmit(data);
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
            name="name"
            control={control}
            label="Company name"
            required
            fullWidth
            autoFocus
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <FormInputText
            name="vatNumber"
            control={control}
            label="TVA"
            required
            fullWidth
            error={!!errors.vatNumber}
            helperText={errors.vatNumber?.message}
          />
        </Grid>
        <Grid item xs={6}>
          <FormInputText
            name="rcsNumber"
            control={control}
            label="RCS"
            fullWidth
            error={!!errors.rcsNumber}
            helperText={errors.rcsNumber?.message}
          />
        </Grid>
        <Grid item xs={6}>
          <FormInputText
            name="siren"
            control={control}
            label="SIREN"
            fullWidth
            error={!!errors.siren}
            helperText={errors.siren?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <FormInputText
            name="siret"
            control={control}
            label="SIRET"
            fullWidth
            error={!!errors.siret}
            helperText={errors.siret?.message}
          />
        </Grid>
      </Grid>
      {render}
    </Box>
  );
};
