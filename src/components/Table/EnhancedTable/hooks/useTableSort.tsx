import { useCallback, useState } from "react";

interface SortLocalState {
  property: string;
  isReverse: boolean;
}

const INIT_SORT_STATE: SortLocalState = {
  property: "none",
  isReverse: false,
};

export const useTableSort = (init: SortLocalState = INIT_SORT_STATE) => {
  const [sort, setSort] = useState<SortLocalState>(init);

  const handleSort = useCallback(
    (property: string) => {
      const isReverse = sort.property === property && !sort.isReverse;
      setSort({ property, isReverse });
    },
    [sort.isReverse, sort.property]
  );

  const handleResetSort = () => {
    setSort(INIT_SORT_STATE);
  };

  return { sort, handleResetSort, handleSort };
};
