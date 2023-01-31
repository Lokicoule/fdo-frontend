import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { useTranslation } from "react-i18next";
import client, { BaseException } from "~/libs/graphql-client";
import { notify } from "~/libs/notify";
import { Customer } from "../types";

export type CreateCustomerInput = {
  name: string;
  email?: string;
  phoneNumber?: string;
  code?: string;
  address?: {
    name: string;
    phoneNumber: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    country: string;
    zipCode: string;
  };
};

export type CreateCustomerVariables = {
  payload: CreateCustomerInput;
};

type CreateCustomerResponse = {
  createCustomer: Customer;
};

const CreateCustomer = gql`
  mutation CreateCustomer($payload: CreateCustomerMutation!) {
    createCustomer(payload: $payload) {
      code
      name
      id
    }
  }
`;

const createCustomer = (variables: CreateCustomerVariables) =>
  client
    .request<CreateCustomerResponse, CreateCustomerVariables>(
      CreateCustomer,
      JSON.parse(JSON.stringify(variables))
    )
    .then((data) => data.createCustomer);

export const useCreateCustomer = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation(["customers", "common"]);

  return useMutation<Customer, BaseException, CreateCustomerVariables>(
    createCustomer,
    {
      onSuccess: (data) => {
        console.log(data);
        notify.success({
          title: t("common:dictionary.customer"),
          message: t("customers:@createCustomer.notification.success", {
            label: data?.code,
          }),
        });
        queryClient.invalidateQueries(["customers"]);
      },
      useErrorBoundary: (error) => error.useBoundary,
    }
  );
};
