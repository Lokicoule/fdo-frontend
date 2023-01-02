export type BaseEntity = {
  id: string;
  createdAt?: string;
  updatedAt?: string;
};

export type BaseError = {
  message: string;
};

export type Overwrite<T, U> = Omit<T, keyof U> & U;
