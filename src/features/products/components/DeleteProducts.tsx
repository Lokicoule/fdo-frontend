import DeleteIcon from "@mui/icons-material/Delete";
import { Button, IconButton, Tooltip } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { ConfirmationDialog } from "~/components/Elements/ConfirmationDialog";
import { notify } from "~/libs/notify";
import { useDeleteProducts } from "../api/deleteProducts";
import { Product } from "../types";

export const DeleteProducts = (props: { ids?: string[] }) => {
  const { ids } = props;
  const queryClient = useQueryClient();
  const { t } = useTranslation(["common", "products"]);

  if (!ids || ids.length === 0) {
    return null;
  }

  const codes = queryClient
    .getQueryData<Product[]>(["products"])
    ?.filter((product) => ids.includes(product.id))
    .map((product) => product.code)
    .join(" / ");

  const deleteProducts = useDeleteProducts();

  const handleDelete = async () => {
    console.log("Delete products", ids);
    deleteProducts
      .mutateAsync({
        ids,
      })
      .catch((err) => {
        notify.error({
          title: "Delete products failed",
          message: err.message,
        });
      });
  };

  return (
    <ConfirmationDialog
      title={t("common:dictionary.areYouSureToContinue")}
      isDone={deleteProducts.isSuccess || deleteProducts.isError}
      body={
        <>
          {t("products:@deleteProducts.message")}
          <br />
          <br />
          <strong>{codes}</strong>
        </>
      }
      triggerButton={
        <Tooltip title="remove all products">
          <IconButton
            sx={{
              backgroundColor: "error.main",
            }}
            size="medium"
          >
            <DeleteIcon
              sx={{
                color: "error.contrastText",
              }}
              fontSize="small"
            />
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
