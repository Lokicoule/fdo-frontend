import { Control } from "react-hook-form";

export type FormInputProps = {
  name: string;
  control: Control<any, any>;
  fieldError?: string;
  tooltip?: string;
};
