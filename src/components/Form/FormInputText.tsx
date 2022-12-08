import { Alert, TextField, TextFieldProps, Tooltip } from "@mui/material";

import { Controller } from "react-hook-form";

import { FormInputProps } from "./FormInputProps";

export type FormInputTextProps = TextFieldProps & FormInputProps;

export const FormInputText: React.FunctionComponent<FormInputTextProps> = (
  props
) => {
  const { name, control, tooltip, fieldError, ...textFieldProps } = props;

  const renderTextField = (props: TextFieldProps) => {
    return <TextField {...props} />;
  };

  const renderTooltip = (props: TextFieldProps) => {
    return <Tooltip title={tooltip}>{renderTextField(props)}</Tooltip>;
  };

  return (
    <>
      <Controller
        render={({ field }) =>
          Boolean(tooltip)
            ? renderTooltip({ ...field, ...textFieldProps })
            : renderTextField({ ...field, ...textFieldProps })
        }
        name={name}
        control={control}
        defaultValue={textFieldProps.defaultValue ?? ""}
      />
      {fieldError && (
        <Alert severity="error" sx={{ mt: 1 }}>
          {fieldError}
        </Alert>
      )}
    </>
  );
};
