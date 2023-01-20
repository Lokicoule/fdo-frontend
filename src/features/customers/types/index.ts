import { BaseEntity } from "~/types";

export type Customer = BaseEntity & {
  code: string;
  name: string;
  email: string;
  phone: string;
};
