import { useQuery, useQueryClient } from "@tanstack/react-query";
import { gql } from "graphql-request";
import client, { BaseException } from "~/libs/graphql-client";
import { Product } from "../types";

export type ProductsQuery = {
  label?: string;
  code?: string;
  id?: string;
};

export type GetProductsVariables = {
  criteria?: ProductsQuery;
};

export type GetProductsResponse = {
  products: Product[];
};

const GetProducts = gql`
  query GetProducts($criteria: ProductsQuery) {
    products(criteria: $criteria) {
      label
      id
      code
      createdAt
      updatedAt
    }
  }
`;

export const getProducts = (
  variables?: GetProductsVariables
): Promise<Product[]> =>
  client
    .request<GetProductsResponse, GetProductsVariables>(
      GetProducts,
      variables || {}
    )
    .then((data) => data.products);

export const useGetProducts = (variables?: GetProductsVariables) => {
  const queryClient = useQueryClient();
  return useQuery<Product[], BaseException>(
    ["products", variables],
    () => getProducts(variables),
    {
      onSuccess: (data) => {
        queryClient.setQueryData<Product[]>(["products"], data);
      },
      useErrorBoundary: (error) => error.useBoundary,
    }
  );
};
