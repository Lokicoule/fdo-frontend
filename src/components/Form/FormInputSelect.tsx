import React from "react";

import {
  Alert,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  SelectProps,
} from "@mui/material";

import { Controller } from "react-hook-form";

import { FormInputProps } from "./FormInputProps";

type Props = SelectProps & Omit<FormInputProps, "tooltip">;

const FormInputSelect: React.FunctionComponent<Props> = (props) => {
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

export type FormInputSelectProps = Props;
export { FormInputSelect };
