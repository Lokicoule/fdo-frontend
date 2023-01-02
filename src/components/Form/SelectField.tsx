import Alert from "@mui/material/Alert";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectProps } from "@mui/material/Select";

import { Controller, ControllerProps, FieldError } from "react-hook-form";
import { FieldWrapper } from "./FieldWrapper";

export type SelectFieldProps = SelectProps &
  Pick<ControllerProps, "name" | "control"> & {
    error?: FieldError | undefined;
  };

export const SelectField: React.FunctionComponent<SelectFieldProps> = (
  props
) => {
  const { name, label, control, error, children, ...selectProps } = props;

  const labelId = `${name}-label`;
  const ariaId = `${name}-error`;
  return (
    <FieldWrapper error={error}>
      <FormControl error={error} fullWidth={selectProps.fullWidth}>
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
    </FieldWrapper>
  );
};
