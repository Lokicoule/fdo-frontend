import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  SelectProps,
} from "@mui/material";
import { FC } from "react";
import { Controller } from "react-hook-form";
import { FormInputProps } from "./FormInputProps";

export type FormInputSelectProps = SelectProps &
  Pick<FormInputProps, "control" | "name" | "helperText">;

export const FormInputSelect: FC<FormInputSelectProps> = ({
  name,
  label,
  defaultValue = "",
  control,
  error,
  helperText,
  children,
}) => {
  const labelId = `${name}-label`;
  const ariaId = `${name}-error`;
  return (
    <FormControl error={error} fullWidth>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Controller
        render={({ field }) => (
          <Select
            {...field}
            labelId={labelId}
            label={label}
            aria-describedby={ariaId}
          >
            {children}
          </Select>
        )}
        name={name}
        control={control}
        defaultValue={defaultValue}
      />
      {error && <FormHelperText id={ariaId}>{helperText}</FormHelperText>}
    </FormControl>
  );
};
