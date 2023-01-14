import { FetchError } from "~/libs/graphql-fetcher";
import { notify } from "~/libs/notify";
import queryClient from "~/libs/react-query";
import { useUpdateProductMutation } from "./__generated__/client";

export const useUpdateProduct = () =>
  useUpdateProductMutation<FetchError>({
    onSuccess: (product) => {
      notify.success({
        title: "Product updated",
        message: `Product ${product.updateProduct?.label} has been updated`,
      });
      queryClient.invalidateQueries(["GetProduct"]);
      queryClient.invalidateQueries(["GetProducts"]);
    },
  });
