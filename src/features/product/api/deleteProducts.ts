import { useRemoveProductsMutation } from "./__generated__/client";
import { notify } from "~/libs/notify";
import queryClient from "~/libs/react-query";
import { FetchError } from "~/libs/graphql-fetcher";

export const useDeleteProducts = () =>
  useRemoveProductsMutation<FetchError>({
    onSuccess: () => {
      notify.success({
        title: "Products removed",
        message: `Products have been removed`,
      });
      queryClient.invalidateQueries(["GetProducts"]);
    },
  });
