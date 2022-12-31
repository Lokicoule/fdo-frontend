import { lazy } from "react";

/**
 * @description This function is a workaround in order to be able to use lazy imports with named exports.
 * @issue https://github.com/facebook/react/issues/14603#issuecomment-726551598
 * @param factory A function that returns a promise that resolves to an object with the named exports.
 * @param name The name of the named export.
 * @returns An object with the named export as a lazy component.
 * @example
 * const { MyComponent } = lazyImport(() => import("./MyComponent"), "MyComponent");
 */
export function lazyImport<
  T extends React.ComponentType<any>,
  I extends { [K2 in K]: T },
  K extends keyof I
>(factory: () => Promise<I>, name: K): I {
  return Object.create({
    [name]: lazy(() => factory().then((module) => ({ default: module[name] }))),
  });
}
