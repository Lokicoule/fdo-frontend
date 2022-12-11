import { lazy } from "react";

export const lazyLoader = (
  path: string,
  namedExport: string
): React.LazyExoticComponent<React.ComponentType<any>> => {
  return lazy(() =>
    import(path).then((module) => ({ default: module[namedExport] }))
  );
};
