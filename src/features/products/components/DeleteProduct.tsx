import DeleteIcon from "@mui/icons-material/DeleteOutline";
import { Button, IconButton, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ConfirmationDialog } from "~/components/Elements/ConfirmationDialog";
import { useDeleteProduct } from "../api/deleteProduct";
import { Product } from "../types";

type DeleteProductProps = {
  product: Product;
  onDelete?: () => void;
};

export const DeleteProduct: React.FunctionComponent<DeleteProductProps> = (
  props
) => {
  const { product, onDelete } = props;
  const deleteProduct = useDeleteProduct();

  const { t } = useTranslation();

  const handleDelete = async () => {
    console.log("Delete product", product);
    await deleteProduct.mutate({
      removeProductId: product.id,
    });
    onDelete?.();
  };

  return (
    <ConfirmationDialog
      title={`Delete product ${product.code}`}
      body={
        <>
          Are you sure you want to delete the following product?
          <br />
          <br />
          {product.code}
        </>
      }
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
