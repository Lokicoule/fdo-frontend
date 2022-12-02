import { Box, Grid, Tooltip } from "@mui/material";
import { FormInputText } from "../../../../../../components/Form/FormInputText";
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
          <Tooltip title="Nom de l'entreprise">
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
          </Tooltip>
        </Grid>
        <Grid item xs={12}>
          <Tooltip title="Le numéro de TVA intracommunautaire est composé de 2 lettres suivies de 11 chiffres dont 2 qui correspondent à une clé informatique et les 9 autres au numéro SIREN de l'entreprise.">
            <FormInputText
              name="vatNumber"
              control={control}
              label="TVA"
              required
              fullWidth
              error={!!errors.vatNumber}
              helperText={errors.vatNumber?.message}
              placeholder="FR 00 123456789 (2 lettres, 2 chiffres, 9 chiffres)"
            />
          </Tooltip>
        </Grid>
        <Grid item xs={6}>
          <Tooltip title="Le numéro RCS est composé de la mention RCS suivie du lieu d'immatriculation de l'entreprise et de son numéro SIREN.">
            <FormInputText
              name="rcsNumber"
              control={control}
              label="RCS"
              fullWidth
              error={!!errors.rcsNumber}
              helperText={errors.rcsNumber?.message}
              placeholder="RCS Paris 123456789"
            />
          </Tooltip>
        </Grid>
        <Grid item xs={6}>
          <Tooltip title="Le numéro SIREN est composé de 9 chiffres.">
            <FormInputText
              name="siren"
              control={control}
              label="SIREN"
              fullWidth
              error={!!errors.siren}
              helperText={errors.siren?.message}
              placeholder="123 456 789 ou 123456789"
            />
          </Tooltip>
        </Grid>
        <Grid item xs={12}>
          <Tooltip title="Le numéro de SIRET est composé des 9 chiffres du SIREN associés aux 5 chiffres du NIC.">
            <FormInputText
              name="siret"
              control={control}
              label="SIRET"
              fullWidth
              error={!!errors.siret}
              helperText={errors.siret?.message}
              placeholder="123 456 789 12345 ou 123456789 12345 (SIREN, 5 chiffres du NIC)"
            />
          </Tooltip>
        </Grid>
      </Grid>
      {render}
    </Box>
  );
};
