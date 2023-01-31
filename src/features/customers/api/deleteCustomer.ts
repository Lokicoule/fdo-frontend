import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { useTranslation } from "react-i18next";
import client, { BaseException } from "~/libs/graphql-client";
import { notify } from "~/libs/notify";
import { Customer } from "../types";

type DeleteCustomerInput = {
  id: string;
};

export type DeleteCustomerVariables = {
  payload: DeleteCustomerInput;
};

type DeleteCustomerResponse = {
  deleteCustomer: Customer;
};

const DeleteCustomer = gql`
  mutation DeleteCustomer($payload: DeleteCustomerMutation!) {
    deleteCustomer(payload: $payload) {
      id
    }
  }
`;

const deleteCustomer = (variables: DeleteCustomerVariables) =>
  client
    .request<DeleteCustomerResponse, DeleteCustomerVariables>(
      DeleteCustomer,
      variables
    )
    .then((data) => data.deleteCustomer);

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation(["customers", "common"]);

  return useMutation<Customer, BaseException, DeleteCustomerVariables>(
    deleteCustomer,
    {
      onSuccess: (data, variables) => {
        const { payload } = variables;
        const customer = queryClient
          .getQueryData<Customer[]>(["customers"])
          ?.find((customer) => customer.id === payload.id);
        const { name, code } = data ?? customer ?? {};

        notify.success({
          title: t("common:dictionary.customer"),
          message: t("customers:@deleteCustomer.notification.success", {
            code: name,
          }),
        });
        queryClient.invalidateQueries(["customers"]);
      },
      onError: (error, variables) => {
        const { payload } = variables;
        const customer = queryClient
          .getQueryData<Customer[]>(["customers"])
          ?.find((customer) => customer.id === payload.id);
        const { name, code } = customer ?? {};

        notify.error({
          title: t("common:dictionary.customer"),
          message: t("customers:@deleteCustomer.notification.error", {
            code,
          }),
        });
      },
    }
  );
};
