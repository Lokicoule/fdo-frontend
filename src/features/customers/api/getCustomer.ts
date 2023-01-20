import { useQuery, useQueryClient } from "@tanstack/react-query";
import { gql } from "graphql-request";
import client, { BaseException } from "~/libs/graphql-client";
import { Customer } from "../types";

export type GetCustomerVariables = {
  id: string;
};

type GetCustomerResponse = {
  customer: Customer;
};

const GetCustomer = gql`
  query GetCustomer($id: String!) {
    customer(id: $id) {
      id
      code
      name
      email
      phone
      createdAt
      updatedAt
    }
  }
`;

export const getCustomer = (
  variables: GetCustomerVariables
): Promise<Customer> =>
  client
    .request<GetCustomerResponse, GetCustomerVariables>(GetCustomer, variables)
    .then((data) => data.customer);

export const useGetCustomer = (variables: GetCustomerVariables) => {
  const queryClient = useQueryClient();
  return useQuery<Customer, BaseException>(
    ["customer", variables],
    () => getCustomer(variables),
    {
      enabled: !!variables.id,
      placeholderData: () => {
        return queryClient
          .getQueryData<Customer[]>(["customers"])
          ?.find((customer) => customer.id === variables.id);
      },
      useErrorBoundary: (error) => error.useBoundary,
    }
  );
};
