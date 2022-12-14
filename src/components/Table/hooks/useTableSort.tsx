import { useCallback, useMemo, useState } from "react";

interface SortLocalState {
  property: string;
  isReverse: boolean;
}

const INIT_SORT_STATE: SortLocalState = {
  property: "none",
  isReverse: false,
};

export const useTableSort = (
  init: SortLocalState = INIT_SORT_STATE
): [
  SortLocalState,
  {
    onSort: (property: string) => void;
    onReset: () => void;
  }
] => {
  const [sort, setSort] = useState<SortLocalState>(init);

  const handleSort = (property: string) => {
    const isReverse = sort.property === property && !sort.isReverse;
    setSort({ property, isReverse });
  };
  const handleReset = () => setSort(INIT_SORT_STATE);

  const handlers = useMemo(
    () => ({
      onSort: handleSort,
      onReset: handleReset,
    }),
    []
  );

  return [sort, handlers];
};
