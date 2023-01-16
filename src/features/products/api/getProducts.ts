import { useQuery, useQueryClient } from "@tanstack/react-query";
import { gql } from "graphql-request";
import client, { GraphQLClientError } from "~/libs/graphql-client";
import { Product } from "../types";

export type ProductCriteriaInput = {
  label?: string;
  code?: string;
  id?: string;
};

export type GetProductsVariables = {
  criterions?: ProductCriteriaInput;
};

export type GetProductsResponse = {
  products: Product[];
};

const GetProducts = gql`
  query GetProducts($criterions: ProductCriteriaInput) {
    products(criterions: $criterions) {
      label
      id
      code
      createdAt
      updatedAt
    }
  }
`;

export const getProducts = async (
  variables?: GetProductsVariables
): Promise<Product[]> => {
  try {
    const result = await client.request<
      GetProductsResponse,
      GetProductsVariables
    >(GetProducts, variables || {});
    return result.products;
  } catch (error) {
    throw error;
  }
};

export const useGetProducts = (variables?: GetProductsVariables) => {
  const queryClient = useQueryClient();
  return useQuery<Product[], GraphQLClientError>(
    ["products", variables],
    () => getProducts(variables),
    {
      onSuccess: (data) => {
        queryClient.setQueryData<Product[]>(["products"], data);
      },
      useErrorBoundary: (error) => error?.status >= 500,
    }
  );
};
