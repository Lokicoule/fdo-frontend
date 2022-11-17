import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  OutlinedInputProps,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { Control, Controller } from "react-hook-form";
import { useToggle } from "hooks";

export type FormInputSecretProps = OutlinedInputProps & {
  control: Control<any, any>;
  name: string;
  helperText?: string | undefined;
};
export const FormInputSecret = ({
  control,
  name,
  fullWidth,
  label,
  required,
  error,
  helperText,
  ...inputProps
}: FormInputSecretProps) => {
  const [showPassword, toggleShowPassword] = useToggle(false);
  const labelId = `secret-${name}-label`;
  const ariaId = `secret-${name}-error`;

  return (
    <FormControl variant="outlined" required={required} fullWidth={fullWidth}>
      <InputLabel htmlFor={labelId}>{label}</InputLabel>
      <Controller
        render={({ field: { onChange, value } }) => (
          <OutlinedInput
            {...inputProps}
            fullWidth={fullWidth}
            id={labelId}
            type={showPassword ? "text" : "password"}
            onChange={onChange}
            value={value}
            error={error}
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
      />
      {error && (
        <FormHelperText error variant="filled" id={ariaId}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};
