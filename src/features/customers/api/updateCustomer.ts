import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { useTranslation } from "react-i18next";
import client, { BaseException } from "~/libs/graphql-client";
import { notify } from "~/libs/notify";
import { Customer } from "../types";

export type UpdateCustomerInput = {
  id: string;
  name: string;
  phone: string;
  email: string;
  code: string;
};

export type UpdateCustomerVariables = {
  payload: UpdateCustomerInput;
};

type UpdateCustomerResponse = {
  updateCustomer: Customer;
};

const UpdateCustomer = gql`
  mutation UpdateCustomer($payload: CustomerUpdateInput!) {
    updateCustomer(payload: $payload) {
      code
      name
      id
    }
  }
`;

const updateCustomer = (
  variables: UpdateCustomerVariables
): Promise<Customer> =>
  client
    .request<UpdateCustomerResponse, UpdateCustomerVariables>(
      UpdateCustomer,
      variables
    )
    .then((data) => data.updateCustomer);

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation(["customers", "common"]);
  return useMutation<Customer, BaseException, UpdateCustomerVariables>(
    updateCustomer,
    {
      onSuccess: (data) => {
        notify.success({
          title: t("common:dictionary.customer"),
          message: t("customers:@updateCustomer.notification.success", {
            code: data?.code,
          }),
        });
        queryClient.invalidateQueries(["customers"]);
      },
    }
  );
};
