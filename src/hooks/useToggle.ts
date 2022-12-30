import { useCallback, useState } from "react";

export const useToggle = (
  initialState = false
): [
  boolean,
  {
    toggle: () => void;
    setState: (state: boolean) => void;
  }
] => {
  const [state, setState] = useState(initialState);

  const toggle = useCallback(() => setState((state: Boolean) => !state), []);

  return [state, { toggle, setState }];
};
