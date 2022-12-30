import { Visibility, VisibilityOff } from "@mui/icons-material";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

import { useToggle } from "~/hooks/useToggle";
import { FormInputText, FormInputTextProps } from "./FormInputText";

export type FormInputSecretProps = FormInputTextProps;

export const FormInputSecret: React.FunctionComponent<FormInputSecretProps> = (
  props
) => {
  const { name, control, fieldError, ...inputProps } = props;
  const [showPassword, toggleShowPassword] = useToggle(false);

  return (
    <>
      <FormInputText
        {...inputProps}
        name={name}
        control={control}
        fieldError={fieldError}
        type={showPassword ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={toggleShowPassword.toggle} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {fieldError && (
        <Alert severity="error" sx={{ mt: 1 }}>
          {fieldError}
        </Alert>
      )}
    </>
  );
};
