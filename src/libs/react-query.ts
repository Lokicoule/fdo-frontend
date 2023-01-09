import {
  DefaultOptions,
  QueryClient,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

const queryConfig: DefaultOptions = {
  queries: {
    /*     useErrorBoundary: true,
     */
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60 * 5,
  },
};

const queryClient = new QueryClient({ defaultOptions: queryConfig });

export default queryClient;
