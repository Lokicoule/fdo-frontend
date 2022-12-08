import {
  Alert,
  FormControl,
  InputLabel,
  Select,
  SelectProps,
} from "@mui/material";

import { Controller } from "react-hook-form";

import { FormInputProps } from "./FormInputProps";

export type FormInputSelectProps = SelectProps &
  Omit<FormInputProps, "tooltip">;

export const FormInputSelect: React.FunctionComponent<FormInputSelectProps> = (
  props
) => {
  const { name, label, control, fieldError, children, ...selectProps } = props;

  const labelId = `${name}-label`;
  const ariaId = `${name}-error`;
  return (
    <>
      <FormControl error={selectProps.error} fullWidth={selectProps.fullWidth}>
        <InputLabel id={labelId}>{label}</InputLabel>
        <Controller
          render={({ field }) => (
            <Select
              {...field}
              {...selectProps}
              labelId={labelId}
              label={label}
              aria-describedby={ariaId}
            >
              {children}
            </Select>
          )}
          name={name}
          control={control}
          defaultValue={selectProps.defaultValue ?? ""}
        />
      </FormControl>
      {fieldError && (
        <Alert severity="error" sx={{ mt: 1 }}>
          {fieldError}
        </Alert>
      )}
    </>
  );
};
