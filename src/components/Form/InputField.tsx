import { Alert, TextField, TextFieldProps, Tooltip } from "@mui/material";

import {
  Controller,
  FieldError,
  FieldValues,
  Path,
  PathValue,
  UseControllerProps,
} from "react-hook-form";

export type InputFieldProps<T extends FieldValues> = Omit<
  TextFieldProps,
  "error" | "name"
> & {
  tooltip?: {
    title: string;
  };
  error?: FieldError;
  name: Path<T>;
  control: UseControllerProps<T>["control"];
  defaultValue?: PathValue<T, Path<T>>;
};

export const InputField = <T extends FieldValues>(
  props: InputFieldProps<T>
): JSX.Element => {
  const { name, control, tooltip, error, defaultValue, ...textFieldProps } =
    props;

  const renderTextField = (props: TextFieldProps) => {
    return <TextField {...props} />;
  };

  const renderTooltip = (props: TextFieldProps) => {
    return <Tooltip title={tooltip?.title}>{renderTextField(props)}</Tooltip>;
  };

  return (
    <div>
      <Controller
        render={({ field }) =>
          Boolean(tooltip?.title)
            ? renderTooltip({ ...field, ...textFieldProps })
            : renderTextField({ ...field, ...textFieldProps })
        }
        name={name}
        control={control}
        defaultValue={defaultValue}
      />
      {error?.message && (
        <Alert severity="error" sx={{ mt: 1 }}>
          {error.message}
        </Alert>
      )}
    </div>
  );
};
