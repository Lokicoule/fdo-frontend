import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { useCreateUser } from "./CreateUserContext";
import { Divider, Paper } from "@mui/material";

const products = [
  {
    name: "Product 1",
    desc: "A nice thing",
    price: "$9.99",
  },
  {
    name: "Product 2",
    desc: "Another thing",
    price: "$3.45",
  },
  {
    name: "Product 3",
    desc: "Something else",
    price: "$6.51",
  },
  {
    name: "Product 4",
    desc: "Best thing of all",
    price: "$14.11",
  },
  { name: "Shipping", desc: "", price: "Free" },
];
const addresses = ["1 MUI Drive", "Reactville", "Anytown", "99999", "USA"];
const payments = [
  { name: "Card type", detail: "Visa" },
  { name: "Card holder", detail: "Mr John Smith" },
  { name: "Card number", detail: "xxxx-xxxx-xxxx-1234" },
  { name: "Expiry date", detail: "04/2024" },
];

export default function Review() {
  const { address, company, user } = useCreateUser();

  if (!user || !company || !address) {
    return null;
  }

  const userDetails = [
    { label: "Nom", value: user.lastName },
    { label: "Prénom", value: user.firstName },
    { label: "Adresse email", value: user.email },
    { label: "Numéro de téléphone", value: user.phone },
  ];

  const companyDetails = [
    { label: "Nom d'entreprise", value: company.name },
    { label: "Numéro TVA", value: company.vatNumber },
    { label: "Numéro RCS", value: company.rcsNumber },
    { label: "SIREN", value: company.siren },
    { label: "SIRET", value: company.siret },
  ];

  const addressDetails = [
    { label: "Adresse", value: address.address },
    { label: "Complément d'adresse", value: address.additionalAddress },
    { label: "Code postal", value: address.zipCode },
    { label: "Ville", value: address.city },
    { label: "Pays", value: address.country },
  ];

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
        Informations personelles
      </Typography>
      <Grid container>
        {userDetails.map((user) => (
          <React.Fragment key={user.label}>
            <Grid item xs={6}>
              <Typography fontWeight={"bold"} variant="overline" gutterBottom>
                {user.label}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography fontStyle={"oblique"} variant="overline" gutterBottom>
                {user.value}
              </Typography>
            </Grid>
          </React.Fragment>
        ))}
      </Grid>
      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
        Entreprise
      </Typography>
      <Grid container>
        {companyDetails.map((user) => (
          <React.Fragment key={user.label}>
            <Grid item xs={6}>
              <Typography fontWeight="bold" variant="overline" gutterBottom>
                {user.label}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography fontStyle="oblique" variant="overline" gutterBottom>
                {user.value}
              </Typography>
            </Grid>
          </React.Fragment>
        ))}
      </Grid>

      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
        Adresse
      </Typography>
      <Grid container>
        {addressDetails.map((user) => (
          <React.Fragment key={user.label}>
            <Grid item xs={6}>
              <Typography fontWeight={"bold"} variant="overline" gutterBottom>
                {user.label}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography fontStyle={"oblique"} variant="overline" gutterBottom>
                {user.value}
              </Typography>
            </Grid>
          </React.Fragment>
        ))}
      </Grid>
    </React.Fragment>
  );
}
