import { Fragment } from "react";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { ProductDto } from "../graphql/product.client";

function getProductDetails(productDetails: ProductDto) {
  return [
    { label: "Code produit", value: productDetails.code },
    { label: "Libellé produit", value: productDetails.label },
    { label: "Date de création", value: productDetails.createdAt },
    { label: "Date de mise à jour", value: productDetails.updatedAt },
  ];
}

type ReviewProps = {
  title: string;
  values: { label: string; value: string }[];
};

const Review: React.FunctionComponent<ReviewProps> = (props) => {
  const { title, values } = props;

  return (
    <>
      <Typography
        variant="overline"
        gutterBottom
        fontWeight={700}
        fontSize={30}
        sx={{
          mb: 2,
        }}
      >
        {title}
      </Typography>
      <Grid container>
        {values.map(({ label, value }) => (
          <Fragment key={label}>
            <Grid
              item
              xs={6}
              sx={{
                mt: 1,
              }}
            >
              <Typography fontWeight="bold" variant="overline" gutterBottom>
                {label}
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                mt: 1,
                textAlign: "right",
              }}
            >
              <Typography fontStyle="oblique" gutterBottom>
                {value}
              </Typography>
            </Grid>
          </Fragment>
        ))}
      </Grid>
    </>
  );
};

type ReviewProductContentProps = {
  product: ProductDto;
};

export const ReviewProductContent: React.FunctionComponent<
  ReviewProductContentProps
> = (props) => {
  const { product } = props;

  const productDetails = getProductDetails(product);

  return (
    <Paper
      elevation={6}
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Review title="Fiche Produit" values={productDetails} />
    </Paper>
  );
};
