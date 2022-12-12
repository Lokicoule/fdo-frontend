import { useCallback, useState } from "react";
import { DataProps } from "../../data.props";

export const useTableSelect = (init: string[] = []) => {
  const [selected, setSelected] = useState<readonly string[]>(init);

  const handleDeselectAll = () => {
    setSelected([]);
  };

  const handleSelectAll =
    (data: DataProps[]) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelected(event.target.checked ? data?.map((n) => n?.id) : []);
    };

  const handleSelect = useCallback(
    (name: string) => {
      const selectedIndex = selected.indexOf(name);
      let newSelected: readonly string[] = [];

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
    },
    [selected]
  );

  return { selected, handleDeselectAll, handleSelect, handleSelectAll };
};
