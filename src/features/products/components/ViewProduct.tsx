import { Box, Chip, Slide, Stack } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { dateFormat } from "~/utils/dateFormat";
import { useGetProduct } from "../api/getProduct";
import { DeleteProduct } from "./DeleteProduct";
import { UpdateProduct } from "./UpdateProduct";

type ProductProps = {
  productId: string;
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export const ViewProduct: React.FunctionComponent<ProductProps> = (props) => {
  const { productId } = props;

  const getProductQuery = useGetProduct({
    variables: {
      getProductId: productId,
    },
  });

  if (!getProductQuery.data) return <div>Product not found</div>;

  return (
    <>
      <Stack
        spacing={2}
        direction="row"
        sx={{
          pb: 2,
        }}
      >
        <UpdateProduct productId={productId} />
        <DeleteProduct product={getProductQuery.data} />
      </Stack>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" fontWeight={600}>
        Code produit
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        <Chip label={getProductQuery.data.code} />
      </Typography>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" fontWeight={600}>
        Libellé produit
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {getProductQuery.data.label}
      </Typography>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" fontWeight={600}>
        Date de création
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {dateFormat(getProductQuery.data.createdAt)}
      </Typography>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" fontWeight={600}>
        Dernière mise à jour
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {dateFormat(getProductQuery.data.updatedAt)}
      </Typography>
    </>
  );
};
