import { TextField, TextFieldProps, Tooltip } from "@mui/material";

import {
  Controller,
  FieldValues,
  Path,
  PathValue,
  UseControllerProps,
} from "react-hook-form";
import { FieldWrapper, FieldWrapperProps } from "./FieldWrapper";

export type InputFieldProps<T extends FieldValues> = Omit<
  TextFieldProps,
  "error" | "name"
> & {
  tooltip?: {
    title: string;
  };
  name: Path<T>;
  control: UseControllerProps<T>["control"];
  defaultValue?: PathValue<T, Path<T>>;
} & FieldWrapperProps;

export const InputField = <T extends FieldValues>(
  props: InputFieldProps<T>
): JSX.Element => {
  const { name, control, tooltip, error, defaultValue, ...textFieldProps } =
    props;

  console.log("InputField", props);

  const renderTextField = (props: TextFieldProps) => {
    return <TextField {...props} />;
  };

  const renderTooltip = (props: TextFieldProps) => {
    return <Tooltip title={tooltip?.title}>{renderTextField(props)}</Tooltip>;
  };

  return (
    <FieldWrapper error={error}>
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
    </FieldWrapper>
  );
};
