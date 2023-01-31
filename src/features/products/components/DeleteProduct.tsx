import DeleteIcon from "@mui/icons-material/DeleteOutline";
import { Alert, AlertTitle, Button, IconButton, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ConfirmationDialog } from "~/components/Elements/ConfirmationDialog";
import { notify } from "~/libs/notify";
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

  const { t } = useTranslation(["common", "products"]);

  const handleDelete = () => {
    deleteProduct
      .mutateAsync({
        payload: {
          id: product.id,
        },
      })
      .then(() => {
        onDelete?.();
      });
  };

  return (
    <ConfirmationDialog
      title={t("common:dictionary.areYouSureToContinue")}
      body={t("products:@deleteProduct.message", { code: product.code })}
      isDone={deleteProduct.isSuccess || deleteProduct.isError}
      triggerButton={
        <Tooltip title={t("dictionary.delete")}>
          <IconButton size="small">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      }
      confirmButton={
        <Button variant="contained" color="error" onClick={handleDelete}>
          {t("dictionary.confirm")}
        </Button>
      }
    />
  );
};
