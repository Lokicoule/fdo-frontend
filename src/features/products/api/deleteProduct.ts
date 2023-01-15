import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gql } from "graphql-request";
import client, { BaseError } from "~/libs/graphql-client";
import { Product } from "../types";
import { notify } from "~/libs/notify";

export type DeleteProductVariables = {
  id: string;
};

type DeleteProductResponse = {
  deleteProduct: Product;
};

const DeleteProduct = gql`
  mutation DeleteProduct($id: String!) {
    removeProduct(id: $id) {
      id
    }
  }
`;

const deleteProduct = async (
  variables: DeleteProductVariables
): Promise<Product> => {
  try {
    const result = await client.request<
      DeleteProductResponse,
      DeleteProductVariables
    >(DeleteProduct, variables);
    return result.deleteProduct;
  } catch (error) {
    if (error instanceof BaseError) {
      console.error("deleteProduct", error.status);
      throw error;
    }
    throw error;
  }
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<Product, BaseError, DeleteProductVariables>(
    deleteProduct,
    {
      onSuccess: (data) => {
        console.log("useDeleteProduct", data);
        notify.success({
          title: "Product deleted",
          message: `Product ${data?.label} has been deleted`,
        });
        queryClient.invalidateQueries(["products"]);
      },
    }
  );
};
