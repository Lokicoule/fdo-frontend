import DeleteIcon from "@mui/icons-material/DeleteOutline";
import { Button, IconButton, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ConfirmationDialog } from "~/components/Elements/ConfirmationDialog";
import { useDeleteProduct } from "../api/deleteProduct";
import { Product } from "../types";

type DeleteProductProps = {
  product: Product;
};

export const DeleteProduct: React.FunctionComponent<DeleteProductProps> = (
  props
) => {
  const { product } = props;
  const deleteProduct = useDeleteProduct();

  const { t } = useTranslation();

  const handleDelete = async () => {
    console.log("Delete product", product);
    await deleteProduct.mutate({
      removeProductId: product.id,
    });
  };

  return (
    <ConfirmationDialog
      title={`Delete product ${product.code}`}
      body={`Are you sure you want to remove product ${product.label}?`}
      triggerButton={
        <Tooltip title={t("dictionary.delete")}>
          <IconButton size="small">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      }
      confirmButton={<Button onClick={handleDelete}>Confirm</Button>}
    />
  );
};
