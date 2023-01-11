import { BaseEntity } from "~/types";

export type Product = BaseEntity & {
  code: string;
  label: string;
};
