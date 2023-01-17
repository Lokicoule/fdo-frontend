import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { useTranslation } from "react-i18next";
import client, { BaseException } from "~/libs/graphql-client";
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
        const { id } = variables;
        const product = queryClient
          .getQueryData<Product[]>(["products"])
          ?.find((product) => product.id === id);
        const { label, code } = data ?? product ?? {};

        notify.success({
          title: t("common:dictionary.product", {
            name: code,
          }),
          message: t("products:@deleteProduct.notification.success", {
            label,
          }),
        });
        queryClient.invalidateQueries(["products"]);
      },
      onError: (error, variables) => {
        const { id } = variables;
        const product = queryClient
          .getQueryData<Product[]>(["products"])
          ?.find((product) => product.id === id);
        const { label, code } = product ?? {};

        notify.error({
          title: t("common:dictionary.product", {
            name: code,
          }),
          message: t("products:@deleteProduct.notification.error", {
            label,
          }),
        });
      },
    }
  );
};
