import { TextField, TextFieldProps, Tooltip } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import { FormInputProps } from "./FormInputProps";

type Props = TextFieldProps &
  Pick<FormInputProps, "control" | "name" | "tooltip">;

export const FormInputText = ({
  name,
  control,
  tooltip,
  ...textFieldProps
}: Props) => {
  const renderTextField = (props: TextFieldProps) => {
    return <TextField {...props} />;
  };

  const renderTooltip = (props: TextFieldProps) => {
    return <Tooltip title={tooltip}>{renderTextField(props)}</Tooltip>;
  };

  return (
    <Controller
      render={({ field }) =>
        tooltip
          ? renderTooltip({ ...field, ...textFieldProps })
          : renderTextField({ ...field, ...textFieldProps })
      }
      name={name}
      control={control}
      defaultValue=""
    />
  );
};
