import { TextField, TextFieldProps } from "@mui/material";
import { Controller } from "react-hook-form";
import { FormInputProps } from "./FormInputProps";

type Props = TextFieldProps & Pick<FormInputProps, "control" | "name">;

export const FormInputText = ({ name, control, ...textFieldProps }: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextField {...textFieldProps} onChange={onChange} value={value} />
      )}
    />
  );
};
