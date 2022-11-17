import { SxProps, Theme } from "@mui/material";
import { Control } from "react-hook-form";

type Option = {
  key: string;
  value: string;
};

export type FormInputProps = {
  name: string;
  label: string;
  control: Control<any, any>;
  setValue?: Function;
  options?: Option[];
  sx?: SxProps<Theme> | undefined;
  error?: boolean;
  helperText?: string | undefined;
  defaultValue?: string;
};
