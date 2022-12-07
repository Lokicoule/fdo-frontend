import React from "react";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { useFormContext } from "react-hook-form";

import { CreateUserFormProps } from "../CreateUserModal";
import { AddressFormProps } from "./AddressForm";
import { CompanyFormProps } from "./CompanyForm";
import { UserFormProps } from "./UserForm";

function getUserDetails(userDetails: UserFormProps) {
  return [
    { label: "Nom", value: userDetails.lastName },
    { label: "Prénom", value: userDetails.firstName },
    { label: "Adresse email", value: userDetails.email },
    { label: "Numéro de téléphone", value: userDetails.phone },
  ];
}

function getCompanyDetails(companyDetails: CompanyFormProps) {
  return [
    { label: "Nom d'entreprise", value: companyDetails.companyName },
    { label: "Numéro TVA", value: companyDetails.vatNumber },
    { label: "Numéro RCS", value: companyDetails.rcsNumber },
    { label: "SIREN", value: companyDetails.siren },
    { label: "SIRET", value: companyDetails.siret },
  ];
}

function getAddressDetails(addressDetails: AddressFormProps) {
  return [
    { label: "Adresse", value: addressDetails.address },
    { label: "Complément d'adresse", value: addressDetails.additionalAddress },
    { label: "Code postal", value: addressDetails.zipCode },
    { label: "Ville", value: addressDetails.city },
    { label: "Pays", value: addressDetails.country },
  ];
}

type StepReviewProps = {
  title: string;
  values: { label: string; value: string }[];
};

const StepReview: React.FunctionComponent<StepReviewProps> = (props) => {
  const { title, values } = props;

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
        {title}
      </Typography>
      <Grid container>
        {values.map(({ label, value }) => (
          <React.Fragment key={label}>
            <Grid item xs={6}>
              <Typography fontWeight="bold" variant="overline" gutterBottom>
                {label}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography fontStyle="oblique" gutterBottom>
                {value}
              </Typography>
            </Grid>
          </React.Fragment>
        ))}
      </Grid>
    </React.Fragment>
  );
};

const ReviewContent: React.FunctionComponent = () => {
  const { getValues } = useFormContext<CreateUserFormProps>();

  const userDetails = getUserDetails(getValues());
  const companyDetails = getCompanyDetails(getValues());
  const addressDetails = getAddressDetails(getValues());

  return (
    <Paper square elevation={3} sx={{ p: 2 }}>
      <StepReview title="Informations personnelle" values={userDetails} />
      <StepReview title="Entreprise" values={companyDetails} />
      <StepReview title="Adresse" values={addressDetails} />
    </Paper>
  );
};

export { ReviewContent };
