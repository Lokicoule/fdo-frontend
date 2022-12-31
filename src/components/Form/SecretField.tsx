import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

import { FieldValues } from "react-hook-form";
import { useToggle } from "~/hooks/useToggle";
import { InputField, InputFieldProps } from "./InputField";

export type SecretFieldProps<T extends FieldValues> = InputFieldProps<T>;

export const SecretField = <T extends FieldValues>(
  props: SecretFieldProps<T>
): JSX.Element => {
  const { name, control, error, ...inputProps } = props;
  const [showPassword, toggleShowPassword] = useToggle(false);

  return (
    <InputField
      {...inputProps}
      name={name}
      control={control}
      error={error}
      type={showPassword ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={toggleShowPassword.toggle} edge="end">
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
