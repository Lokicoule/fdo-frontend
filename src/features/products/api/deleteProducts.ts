import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gql } from "graphql-request";
import client, { GraphQLClientError } from "~/libs/graphql-client";
import { Product } from "../types";
import { notify } from "~/libs/notify";

export type DeleteProductsVariables = {
  ids: string[];
};

type DeleteProductsResponse = {
  deleteProducts: Product;
};

const DeleteProducts = gql`
  mutation RemoveProducts($ids: [String!]!) {
    removeProducts(ids: $ids)
  }
`;

const deleteProducts = async (
  variables: DeleteProductsVariables
): Promise<Product> => {
  try {
    const result = await client.request<
      DeleteProductsResponse,
      DeleteProductsVariables
    >(DeleteProducts, variables);
    return result.deleteProducts;
  } catch (error) {
    throw error;
  }
};

export const useDeleteProducts = () => {
  const queryClient = useQueryClient();
  return useMutation<Product, GraphQLClientError, DeleteProductsVariables>(
    deleteProducts,
    {
      onSuccess: (data) => {
        console.log("useDeleteProducts", data);
        notify.success({
          title: "Products deleted",
          message: `Products have been deleted`,
        });
        queryClient.invalidateQueries(["products"]);
      },
    }
  );
};
