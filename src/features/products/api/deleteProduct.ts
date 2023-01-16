import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gql } from "graphql-request";
import client, { GraphQLClientError } from "~/libs/graphql-client";
import { notify } from "~/libs/notify";
import { Product } from "../types";

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
    throw error;
  }
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<Product, GraphQLClientError, DeleteProductVariables>(
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
