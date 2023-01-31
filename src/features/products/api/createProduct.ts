import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { useTranslation } from "react-i18next";
import client, { BaseException } from "~/libs/graphql-client";
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
  mutation CreateProduct($payload: CreateProductMutation!) {
    createProduct(payload: $payload) {
      code
      label
      id
    }
  }
`;

const createProduct = (variables: CreateProductVariables) =>
  client
    .request<CreateProductResponse, CreateProductVariables>(
      CreateProduct,
      variables
    )
    .then((data) => data.createProduct);

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation(["products", "common"]);

  return useMutation<Product, BaseException, CreateProductVariables>(
    createProduct,
    {
      onSuccess: (data) => {
        console.log(data);
        notify.success({
          title: t("common:dictionary.product"),
          message: t("products:@createProduct.notification.success", {
            label: data?.label,
          }),
        });
        queryClient.invalidateQueries(["products"]);
      },
      useErrorBoundary: (error) => error.useBoundary,
    }
  );
};
