import DeleteIcon from "@mui/icons-material/Delete";
import { Button, IconButton, Tooltip } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { ConfirmationDialog } from "~/components/Elements/ConfirmationDialog";
import { notify } from "~/libs/notify";
import { useDeleteCustomers } from "../api/deleteCustomers";
import { Customer } from "../types";

export const DeleteCustomers = (props: { ids?: string[] }) => {
  const { ids } = props;
  const queryClient = useQueryClient();
  const { t } = useTranslation(["common", "customers"]);

  if (!ids || ids.length === 0) {
    return null;
  }

  const codes = queryClient
    .getQueryData<Customer[]>(["customers"])
    ?.filter((customer) => ids.includes(customer.id))
    .map((customer) => customer.code)
    .join(" / ");

  const deleteCustomers = useDeleteCustomers();

  const handleDelete = async () => {
    console.log("Delete customers", ids);
    deleteCustomers
      .mutateAsync({
        ids,
      })
      .catch((err) => {
        notify.error({
          title: "Delete customers failed",
          message: err.message,
        });
      });
  };

  return (
    <ConfirmationDialog
      title={t("common:dictionary.areYouSureToContinue")}
      isDone={deleteCustomers.isSuccess || deleteCustomers.isError}
      body={
        <>
          {t("customers:@deleteCustomers.message")}
          <br />
          <br />
          <strong>{codes}</strong>
        </>
      }
      triggerButton={
        <Tooltip title="remove all customers">
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
