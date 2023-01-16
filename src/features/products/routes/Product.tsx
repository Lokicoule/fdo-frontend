import { Chip, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";
import { ContentLayout } from "~/components/Layout/ContentLayout";
import { dateFormat } from "~/utils/dateFormat";
import { useGetProduct } from "../api/getProduct";
import { DeleteProduct } from "../components/DeleteProduct";
import { UpdateProduct } from "../components/UpdateProduct";

export const Product = () => {
  const { productId } = useParams();

  if (!productId) return <div>Product not found</div>;

  const navigate = useNavigate();

  const getProductQuery = useGetProduct({
    id: productId,
  });

  if (!getProductQuery.data) return <div>Product not found</div>;

  const handleDelete = () => {
    navigate("/app/products");
  };

  return (
    <ContentLayout
      title="Product"
      fallback={{
        title: "Product",
      }}
      locations={[
        {
          name: "Dashboard",
          path: "/app",
        },
        {
          name: "Products",
          path: "/app/products",
        },
        {
          name: "View product",
        },
      ]}
    >
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
    </ContentLayout>
  );
};
