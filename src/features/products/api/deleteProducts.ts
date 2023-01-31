import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { useTranslation } from "react-i18next";
import client, { BaseException } from "~/libs/graphql-client";
import { notify } from "~/libs/notify";
import { Product } from "../types";

type DeleteProductsInput = {
  ids: string[];
};

export type DeleteProductsVariables = {
  payload: DeleteProductsInput;
};

type DeleteProductsResponse = {
  deleteProducts: Product;
};

const DeleteProducts = gql`
  mutation RemoveProducts($payload: DeleteProductsMutation!) {
    deleteProducts(payload: $payload)
  }
`;

const deleteProducts = (variables: DeleteProductsVariables) =>
  client
    .request<DeleteProductsResponse, DeleteProductsVariables>(
      DeleteProducts,
      variables
    )
    .then((data) => data.deleteProducts);

export const useDeleteProducts = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation(["products", "common"]);

  return useMutation<Product, BaseException, DeleteProductsVariables>(
    deleteProducts,
    {
      onSuccess: (data, variables) => {
        notify.success({
          title: t("common:dictionary.products"),
          message: t("products:@deleteProducts.notification.success"),
        });
        queryClient.invalidateQueries(["products"]);
      },
    }
  );
};
