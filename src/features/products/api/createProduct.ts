import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gql } from "graphql-request";
import client, { GraphQLClientError } from "~/libs/graphql-client";
import { notify } from "~/libs/notify";
import { Product } from "../types";

export type CreateProductInput = {
  label: string;
  code?: string;
};

export type CreateProductVariables = {
  payload: CreateProductInput;
};

type CreateProductResponse = {
  createProduct: Product;
};

const CreateProduct = gql`
  mutation CreateProduct($payload: ProductCreateInput!) {
    createProduct(payload: $payload) {
      code
      label
      id
    }
  }
`;

const createProduct = async (
  variables: CreateProductVariables
): Promise<Product> => {
  try {
    const result = await client.request<
      CreateProductResponse,
      CreateProductVariables
    >(CreateProduct, variables);
    return result.createProduct;
  } catch (error) {
    throw error;
  }
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<Product, GraphQLClientError, CreateProductVariables>(
    createProduct,
    {
      onSuccess: (data) => {
        console.log("useCreateProduct", data);
        notify.success({
          title: "Product created",
          message: `Product ${data?.label} has been created`,
        });
        queryClient.invalidateQueries(["products"]);
      },
      useErrorBoundary: (error) => error?.status >= 500,
    }
  );
};
