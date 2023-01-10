import DeleteIcon from "@mui/icons-material/Delete";
import { Button, IconButton, Tooltip } from "@mui/material";
import { ConfirmationDialog } from "~/components/Elements/ConfirmationDialog";
import { useDeleteProducts } from "../api/deleteProducts";

export const DeleteProducts = (props: { ids?: string[] }) => {
  const { ids } = props;

  if (!ids || ids.length === 0) {
    return null;
  }

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
      triggerButton={
        <Tooltip title="remove all products">
          <IconButton
            sx={{
              backgroundColor: "error.main",
            }}
            size="small"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      }
      confirmButton={<Button onClick={handleDelete}>Confirm</Button>}
    />
  );
};
