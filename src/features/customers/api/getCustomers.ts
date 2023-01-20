import { useQuery, useQueryClient } from "@tanstack/react-query";
import { gql } from "graphql-request";
import client, { BaseException } from "~/libs/graphql-client";
import { Customer } from "../types";

export type CustomerCriteriaInput = {
  name?: string;
  code?: string;
  id?: string;
};

export type GetCustomersVariables = {
  criterions?: CustomerCriteriaInput;
};

export type GetCustomersResponse = {
  customers: Customer[];
};

const GetCustomers = gql`
  query GetCustomers($criterions: CustomerCriteriaInput) {
    customers(criterions: $criterions) {
      id
      code
      name
      phone
      email
      createdAt
      updatedAt
    }
  }
`;

export const getCustomers = (
  variables?: GetCustomersVariables
): Promise<Customer[]> =>
  client
    .request<GetCustomersResponse, GetCustomersVariables>(
      GetCustomers,
      variables || {}
    )
    .then((data) => data.customers);

export const useGetCustomers = (variables?: GetCustomersVariables) => {
  const queryClient = useQueryClient();
  return useQuery<Customer[], BaseException>(
    ["customers", variables],
    () => getCustomers(variables),
    {
      onSuccess: (data) => {
        queryClient.setQueryData<Customer[]>(["customers"], data);
      },
      useErrorBoundary: (error) => error.useBoundary,
    }
  );
};
