export type BaseEntity = {
  id: string;
  createdAt?: string;
  updatedAt?: string;
};

export type BaseError = {
  message: string;
};

export type Override<T, U> = Omit<T, keyof U> & U;
