import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { useTranslation } from "react-i18next";
import client, { BaseException } from "~/libs/graphql-client";
import { notify } from "~/libs/notify";
import { Product } from "../types";

export type DeleteProductInput = {
  id: string;
};

export type DeleteProductVariables = {
  payload: DeleteProductInput;
};

type DeleteProductResponse = {
  deleteProduct: Product;
};

const DeleteProduct = gql`
  mutation DeleteProduct($payload: DeleteProductMutation!) {
    deleteProduct(payload: $payload) {
      id
    }
  }
`;

const deleteProduct = (variables: DeleteProductVariables) =>
  client
    .request<DeleteProductResponse, DeleteProductVariables>(
      DeleteProduct,
      variables
    )
    .then((data) => data.deleteProduct);

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation(["products", "common"]);

  return useMutation<Product, BaseException, DeleteProductVariables>(
    deleteProduct,
    {
      onSuccess: (data, variables) => {
        const { payload } = variables;
        const product = queryClient
          .getQueryData<Product[]>(["products"])
          ?.find((product) => product.id === payload.id);
        const { label, code } = data ?? product ?? {};

        notify.success({
          title: t("common:dictionary.product"),
          message: t("products:@deleteProduct.notification.success", {
            label,
          }),
        });
        queryClient.invalidateQueries(["products"]);
      },
      onError: (error, variables) => {
        const { payload } = variables;
        const product = queryClient
          .getQueryData<Product[]>(["products"])
          ?.find((product) => product.id === payload.id);
        const { label, code } = product ?? {};

        notify.error({
          title: t("common:dictionary.product"),
          message: t("products:@deleteProduct.notification.error", {
            label,
          }),
        });
      },
    }
  );
};
