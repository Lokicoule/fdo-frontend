import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { useTranslation } from "react-i18next";
import client, { BaseException } from "~/libs/graphql-client";
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
  mutation UpdateProduct($payload: UpdateProductMutation!) {
    updateProduct(payload: $payload) {
      code
      label
      id
    }
  }
`;

const updateProduct = (variables: UpdateProductVariables): Promise<Product> =>
  client
    .request<UpdateProductResponse, UpdateProductVariables>(
      UpdateProduct,
      variables
    )
    .then((data) => data.updateProduct);

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation(["products", "common"]);
  return useMutation<Product, BaseException, UpdateProductVariables>(
    updateProduct,
    {
      onSuccess: (data) => {
        notify.success({
          title: t("common:dictionary.product"),
          message: t("products:@updateProduct.notification.success", {
            label: data?.label,
          }),
        });
        queryClient.invalidateQueries(["products"]);
      },
    }
  );
};
