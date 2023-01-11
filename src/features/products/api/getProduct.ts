import { UseQueryOptions } from "@tanstack/react-query";
import { FetchError } from "~/libs/graphql-fetcher";
import { Overwrite } from "~/types";
import { Product } from "../types";
import {
  GetProductQuery,
  GetProductQueryVariables,
  GetProductsQuery,
  useGetProductQuery,
} from "./__generated__/client";

type UseGetProduct = {
  variables: GetProductQueryVariables;
  options?: UseQueryOptions<GetProductsQuery, FetchError>;
};

export const useGetProduct = ({
  variables,
  options,
}: UseGetProduct): Overwrite<
  ReturnType<typeof useGetProductQuery>,
  { data: Product | undefined | null } // create Maybe type
> => {
  const getProductQuery = useGetProductQuery<GetProductQuery, FetchError>(
    {
      ...variables,
    },
    {
      ...options,
      useErrorBoundary: (error) => error.status >= 500,
    }
  );

  return {
    ...getProductQuery,
    data: getProductQuery.data?.getProduct,
  };
};
