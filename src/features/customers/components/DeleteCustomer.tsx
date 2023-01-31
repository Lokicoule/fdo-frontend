import DeleteIcon from "@mui/icons-material/DeleteOutline";
import { Alert, AlertTitle, Button, IconButton, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ConfirmationDialog } from "~/components/Elements/ConfirmationDialog";
import { notify } from "~/libs/notify";
import { useDeleteCustomer } from "../api/deleteCustomer";
import { Customer } from "../types";

type DeleteCustomerProps = {
  customer: Customer;
  onDelete?: () => void;
};

export const DeleteCustomer: React.FunctionComponent<DeleteCustomerProps> = (
  props
) => {
  const { customer, onDelete } = props;
  const deleteCustomer = useDeleteCustomer();

  const { t } = useTranslation(["common", "customers"]);

  const handleDelete = () => {
    deleteCustomer
      .mutateAsync({
        payload: {
          id: customer.id,
        },
      })
      .then(() => {
        onDelete?.();
      });
  };

  return (
    <ConfirmationDialog
      title={t("common:dictionary.areYouSureToContinue")}
      body={t("customers:@deleteCustomer.message", { code: customer.code })}
      isDone={deleteCustomer.isSuccess || deleteCustomer.isError}
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
