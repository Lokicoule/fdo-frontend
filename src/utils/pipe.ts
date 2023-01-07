type Combiner<T> = (result: T, nextFun: (result: T) => T) => T;

const combine: Combiner<any> = (result, nextFun) => nextFun(result);

type Pipe<T> = (...fns: ((result: T) => T)[]) => (x: T) => T;

export const pipe: Pipe<any> =
  (...fns) =>
  (x) =>
    fns.reduce(combine, x);
