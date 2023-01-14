import { useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import { FetchError } from "~/libs/graphql-fetcher";
import { Overwrite } from "~/types";
import { Product } from "../types";
import {
  GetProductsQuery,
  GetProductsQueryVariables,
  useGetProductsQuery,
} from "./__generated__/client";

type UseGetProducts = {
  variables?: GetProductsQueryVariables;
  options?: UseQueryOptions<GetProductsQuery, FetchError>;
};

export const useGetProducts = ({
  variables,
  options,
}: UseGetProducts): Overwrite<
  ReturnType<typeof useGetProductsQuery>,
  { data: Product[] }
> => {
  const queryClient = useQueryClient();
  const getProductsQuery = useGetProductsQuery<GetProductsQuery, FetchError>(
    {
      ...variables,
    },
    {
      ...options,
      useErrorBoundary: (error) => error.status >= 500,
      //suspense: true,
      onSuccess: (data) => {
        queryClient.setQueryData<GetProductsQuery>(["GetProducts"], data);
      },
    }
  );

  return {
    ...getProductsQuery,
    data: getProductsQuery.data?.getProducts ?? [],
  };
};
