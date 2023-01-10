import { useState } from "react";

export type AsyncState = {
  isLoading: boolean;
  error?: Error;
};

export const useAsyncCallback = <TArgs extends any[], TReturn>(
  fn: (...args: TArgs) => Promise<TReturn>
): [AsyncState, (...args: TArgs) => Promise<TReturn>] => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  const callback = async (...args: TArgs) => {
    setIsLoading(true);
    try {
      const result = await fn(...args);
      return result;
    } catch (error: any) {
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return [{ isLoading, error }, callback];
};
