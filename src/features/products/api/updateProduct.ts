import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gql } from "graphql-request";
import client, { BaseError } from "~/libs/graphql-client";
import { notify } from "~/libs/notify";
import { Product } from "../types";

export type UpdateProductInput = {
  id: string;
  label: string;
  code?: string;
};

export type UpdateProductVariables = {
  payload: UpdateProductInput;
};

type UpdateProductResponse = {
  updateProduct: Product;
};

const UpdateProduct = gql`
  mutation UpdateProduct($payload: ProductUpdateInput!) {
    updateProduct(payload: $payload) {
      code
      label
      id
    }
  }
`;

const updateProduct = async (
  variables: UpdateProductVariables
): Promise<Product> => {
  try {
    const result = await client.request<
      UpdateProductResponse,
      UpdateProductVariables
    >(UpdateProduct, variables);
    return result.updateProduct;
  } catch (error) {
    if (error instanceof BaseError) {
      console.error("updateProduct", error.status);
      throw error;
    }
    throw error;
  }
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<Product, BaseError, UpdateProductVariables>(
    updateProduct,
    {
      onSuccess: (data) => {
        console.log("useUpdateProduct", data);
        notify.success({
          title: "Product updated",
          message: `Product ${data?.label} has been updated`,
        });
        queryClient.invalidateQueries(["products"]);
      },
    }
  );
};
