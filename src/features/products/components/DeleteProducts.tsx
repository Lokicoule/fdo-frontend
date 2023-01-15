import DeleteIcon from "@mui/icons-material/Delete";
import { Button, IconButton, Tooltip } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { ConfirmationDialog } from "~/components/Elements/ConfirmationDialog";
import { useDeleteProducts } from "../api/deleteProducts";
import { GetProductsResponse } from "../api/getProducts";
import { Product } from "../types";

export const DeleteProducts = (props: { ids?: string[] }) => {
  const { ids } = props;
  const queryClient = useQueryClient();

  if (!ids || ids.length === 0) {
    return null;
  }

  const codes = queryClient
    .getQueryData<Product[]>(["products"])
    ?.filter((product) => ids.includes(product.id))
    .map((product) => product.code)
    .join(", ");

  console.log(queryClient.getQueryData<GetProductsResponse>(["products"]));

  const deleteProducts = useDeleteProducts();

  const handleDelete = async () => {
    console.log("Delete products", ids);
    await deleteProducts.mutate({
      ids,
    });
  };

  return (
    <ConfirmationDialog
      title={`Delete products`}
      body={
        <>
          Are you sure you want to delete the following products?
          <br />
          <br />
          {codes}
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
      confirmButton={<Button onClick={handleDelete}>Confirm</Button>}
    />
  );
};
