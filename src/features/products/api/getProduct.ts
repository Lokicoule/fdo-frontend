import { useQuery, useQueryClient } from "@tanstack/react-query";
import { gql } from "graphql-request";
import client, { BaseError } from "~/libs/graphql-client";
import { Product } from "../types";

export type GetProductVariables = {
  id: string;
};

type GetProductResponse = {
  product: Product;
};

const GetProduct = gql`
  query GetProduct($id: String!) {
    product(id: $id) {
      code
      id
      createdAt
      label
      updatedAt
    }
  }
`;

export const getProduct = async (
  variables: GetProductVariables
): Promise<Product> => {
  try {
    const result = await client.request<
      GetProductResponse,
      GetProductVariables
    >(GetProduct, variables);
    return result.product;
  } catch (error) {
    if (error instanceof BaseError) {
      console.error("getProducts", error.status);
      throw error;
    }
    throw error;
  }
};

export const useGetProduct = (variables: GetProductVariables) => {
  const queryClient = useQueryClient();
  return useQuery<Product, BaseError>(
    ["product", variables],
    () => getProduct(variables),
    {
      enabled: !!variables.id,
      placeholderData: () => {
        return queryClient
          .getQueryData<Product[]>(["products"])
          ?.find((product) => product.id === variables.id);
      },
      useErrorBoundary: (error) => error?.status >= 500,
    }
  );
};
