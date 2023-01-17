import { Chip, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { dateFormat } from "~/utils/dateFormat";
import { useGetProduct } from "../api/getProduct";
import { DeleteProduct } from "../components/DeleteProduct";
import { UpdateProduct } from "../components/UpdateProduct";

type ProductContentProps = {
  productId: string;
};

export const ViewProduct: React.FunctionComponent<ProductContentProps> = ({
  productId,
}) => {
  const navigate = useNavigate();
  const getProductQuery = useGetProduct({
    id: productId,
  });
  const { t } = useTranslation(["common", "products"]);

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
        {getProductQuery.data ? (
          <DeleteProduct
            product={getProductQuery.data}
            onDelete={handleDelete}
          />
        ) : null}
      </Stack>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" fontWeight={600}>
        {t("dictionary.code")}
      </Typography>

      <Typography
        variant="body2"
        component={"div"}
        color="text.secondary"
        gutterBottom
      >
        <Chip label={getProductQuery.data?.code} />
      </Typography>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" fontWeight={600}>
        {t("dictionary.label")}
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {getProductQuery.data?.label}
      </Typography>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" fontWeight={600}>
        {t("dictionary.createdAt")}
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {dateFormat(getProductQuery.data?.createdAt)}
      </Typography>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" fontWeight={600}>
        {t("dictionary.updatedAt")}
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {dateFormat(getProductQuery.data?.updatedAt)}
      </Typography>
    </>
  );
};
