import { Control } from "react-hook-form";

type Props = {
  name: string;
  control: Control<any, any>;
  fieldError?: string;
  tooltip?: string;
};

export type FormInputProps = Props;
