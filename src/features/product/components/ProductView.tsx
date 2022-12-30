import { Fragment } from "react";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { ProductDto } from "../api/product.client";

function getProductDetails(productDetails: ProductDto): {
  label: string;
  value: string;
}[] {
  return [
    { label: "Code produit", value: productDetails.code },
    { label: "Libellé produit", value: productDetails.label },
    { label: "Date de création", value: productDetails.createdAt },
    { label: "Date de mise à jour", value: productDetails.updatedAt },
  ];
}

type ProductViewProps = {
  product: ProductDto;
};

const ProductView: React.FunctionComponent<ProductViewProps> = (props) => {
  const { product } = props;

  const productDetails = getProductDetails(product);

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Grid container>
        {productDetails.map(({ label, value }) => (
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
    </Paper>
  );
};

export type { ProductViewProps };
export default ProductView;
