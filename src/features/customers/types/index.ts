import { BaseEntity } from "~/types";

export type Customer = BaseEntity & {
  code: string;
  name: string;
  email: string;
  phoneNumber: string;
  addresses: Address[];
};

export type Address = BaseEntity & {
  name: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  country: string;
  zipCode: string;
};
