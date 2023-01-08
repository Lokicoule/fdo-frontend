import { DefaultOptions, QueryClient } from "@tanstack/react-query";
import { FetchError } from "~/libs/graphql-fetcher";

const queryConfig: DefaultOptions = {
  queries: {
    /*     useErrorBoundary: true,
     */
    refetchOnWindowFocus: false,
    retry: false,
  },
};

export const queryClient = new QueryClient({ defaultOptions: queryConfig });
