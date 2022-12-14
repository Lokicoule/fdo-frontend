import { useCallback, useMemo, useState } from "react";

export const useTableSelect = (
  init: string[] = []
): [
  string[],
  {
    onDeselectAll: () => void;
    onSelect: (name: string) => void;
    onSelectAll: (
      data: any[]
    ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  }
] => {
  const [selected, setSelected] = useState<string[]>(init);

  const handleDeselectAll = () => {
    setSelected([]);
  };

  const handleSelectAll =
    (data: any[]) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelected(event.target.checked ? data?.map((n) => n?.id) : []);
    };

  const handleSelect = (name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handlers = useMemo(
    () => ({
      onDeselectAll: handleDeselectAll,
      onSelect: handleSelect,
      onSelectAll: handleSelectAll,
    }),
    [selected]
  );

  return [selected, handlers];
};
