import { FetchError } from "~/libs/graphql-fetcher";
import { notify } from "~/libs/notify";
import queryClient from "~/libs/react-query";
import { useCreateProductMutation } from "./__generated__/client";

export const useCreateProduct = () =>
  useCreateProductMutation<FetchError>({
    onSuccess: (product) => {
      notify.success({
        title: "Product created",
        message: `Product ${product.createProduct?.label} has been created`,
      });
      queryClient.invalidateQueries(["GetProducts"]);
    },
  });
