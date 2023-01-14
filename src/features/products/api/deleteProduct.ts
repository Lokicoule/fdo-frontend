import { useRemoveProductMutation } from "./__generated__/client";
import { notify } from "~/libs/notify";
import queryClient from "~/libs/react-query";
import { FetchError } from "~/libs/graphql-fetcher";

export const useDeleteProduct = () =>
  useRemoveProductMutation<FetchError>({
    onSuccess: (product) => {
      notify.success({
        title: "Product removed",
        message: `Product has been removed`,
      });
      queryClient.invalidateQueries(["GetProduct"]);
      queryClient.invalidateQueries(["GetProducts"]);
    },
  });
