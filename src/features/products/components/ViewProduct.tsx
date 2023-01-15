import { Chip, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { dateFormat } from "~/utils/dateFormat";
import { useGetProduct } from "../api/getProduct";
import { DeleteProduct } from "./DeleteProduct";
import { UpdateProduct } from "./UpdateProduct";

type ProductProps = {
  productId: string;
};

export const ViewProduct: React.FunctionComponent<ProductProps> = (props) => {
  const { productId } = props;
  const navigate = useNavigate();

  const getProductQuery = useGetProduct({
    id: productId,
  });

  if (!getProductQuery.data) return <div>Product not found</div>;

  const handleDelete = () => {
    navigate("/app/products");
  };

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
        <DeleteProduct product={getProductQuery.data} onDelete={handleDelete} />
      </Stack>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" fontWeight={600}>
        Code produit
      </Typography>
      <Typography
        variant="body2"
        component={"div"}
        color="text.secondary"
        gutterBottom
      >
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
