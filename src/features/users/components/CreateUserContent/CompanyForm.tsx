import { Grid } from "@mui/material";
import { useFormContext } from "react-hook-form";
import * as yup from "yup";
import { FormInputText } from "../../../../components/Form/FormInputText";

export type CompanyFormProps = {
  companyName: string;
  vatNumber: string;
  rcsNumber: string;
  siren: string;
  siret: string;
};

type CompanyFormContentProps = {};

export const companyValidationSchema = yup.object().shape({
  companyName: yup.string().trim().required("Le nom est requis."),
  vatNumber: yup
    .string()
    .matches(
      /^[a-zA-Z]{2}\s?\d{2}\s?\d{3}\s?\d{3}\s?\d{3}$/,
      "Le numéro de TVA est invalide. ex: FR XX XXX XXX XXX ou FR XX XXXXXXXXX ou FR XXXXXXXXXXX ou FRXXXXXXXXXXX"
    )
    .required("Le numéro de TVA est requis."),
  rcsNumber: yup
    .string()
    .matches(
      /^RCS\s[A-Z]+\s([A-Z]\s?)?\d{3}\s?\d{3}\s?\d{3}$/,
      "Le numéro de registre du commerce et des sociétés est invalide. Ex: RCS PARIS XXX XXX XXX ou RCS PARIS XXXXXXXXX ou RCS PARIS AB XXX XXX XXX ou RCS PARIS AB XXXXXXXXX"
    ),
  siren: yup
    .string()
    .matches(
      /^\d{3}\s?\d{3}\s?\d{3}$/,
      "Le numéro SIREN est invalide. Ex: XXX XXX XXX ou XXXXXXXXX"
    ),
  siret: yup
    .string()
    .matches(
      /^\d{3}\s?\d{3}\s?\d{3}\s\d{5}$/,
      "Le numéro de SIRET est invalide. Ex: XXX XXX XXX XXXXX ou XXXXXXXXX XXXXX"
    ),
});

export const CompanyFormContent: React.FC<CompanyFormContentProps> = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<CompanyFormProps>();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormInputText
          name="companyName"
          control={control}
          label="Company name"
          required
          fullWidth
          autoFocus
          error={!!errors.companyName}
          helperText={errors.companyName?.message}
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
          placeholder="FR 00 123456789 (2 lettres, 2 chiffres, 9 chiffres)"
          tooltip="Le numéro de TVA intracommunautaire est composé de 2 lettres suivies de 11 chiffres dont 2 qui correspondent à une clé informatique et les 9 autres au numéro SIREN de l'entreprise."
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
          placeholder="RCS Paris 123456789"
          tooltip="Le numéro RCS est composé de la mention RCS suivie du lieu d'immatriculation de l'entreprise et de son numéro SIREN."
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
          placeholder="123 456 789 ou 123456789"
          tooltip="Le numéro SIREN est composé de 9 chiffres."
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
          placeholder="123 456 789 12345 ou 123456789 12345 (SIREN, 5 chiffres du NIC)"
          tooltip="Le numéro de SIRET est composé des 9 chiffres du SIREN associés aux 5 chiffres du NIC."
        />
      </Grid>
    </Grid>
  );
};
