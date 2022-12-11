import { lazy } from "react";

export const lazyLoad = (path: string, namedExport: string) => {
  return lazy(() =>
    import(path).then((module) => ({ default: module[namedExport] }))
  );
};
