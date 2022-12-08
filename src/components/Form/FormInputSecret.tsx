import { Visibility, VisibilityOff } from "@mui/icons-material";
import Alert from "@mui/material/Alert";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput, { OutlinedInputProps } from "@mui/material/OutlinedInput";

import { Controller } from "react-hook-form";

import { useToggle } from "../../hooks/useToggle";
import { FormInputProps } from "./FormInputProps";

export type FormInputSecretProps = OutlinedInputProps &
  Omit<FormInputProps, "tooltip">;

export const FormInputSecret: React.FunctionComponent<FormInputSecretProps> = (
  props
) => {
  const { name, label, control, fieldError, ...inputProps } = props;
  const [showPassword, toggleShowPassword] = useToggle(false);

  return (
    <>
      <FormControl error={inputProps.error} fullWidth={inputProps.fullWidth}>
        <InputLabel htmlFor={name}>{label}</InputLabel>
        <Controller
          render={({ field: { onChange, value } }) => (
            <OutlinedInput
              {...inputProps}
              id={name}
              type={showPassword ? "text" : "password"}
              onChange={onChange}
              value={value}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={toggleShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label={label}
            />
          )}
          name={name}
          control={control}
          defaultValue={inputProps.defaultValue ?? ""}
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
