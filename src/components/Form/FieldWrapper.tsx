import { Alert, TextFieldProps } from "@mui/material";
import { FieldError } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Overwrite } from "~/types";
import { ValidationError } from "~/types/ValidationError";

type FieldErrorType =
  | FieldError
  | Overwrite<FieldError, { message: ValidationError }>;

type ErrorMessageProps = {
  error?: FieldErrorType;
};

export type FieldWrapperProps = ErrorMessageProps;

const ErrorMessage: React.FunctionComponent<ErrorMessageProps> = (props) => {
  const { error } = props;
  const { t } = useTranslation();

  if (!error?.message) {
    return null;
  } else if (typeof error?.message === "string") {
    console.log("error.message", error.message);
    return (
      <Alert severity="error" sx={{ mt: 1 }}>
        {error.message}
      </Alert>
    );
  } else {
    const { key, values } = error.message;
    console.log(JSON.stringify(error.message));
    return (
      <Alert severity="error" sx={{ mt: 1 }}>
        <>
          {t(key, {
            replace: values,
          })}
        </>
      </Alert>
    );
  }
};

export const FieldWrapper: React.FunctionComponent<
  React.PropsWithChildren<FieldWrapperProps>
> = (props) => {
  const { children, error } = props;

  return (
    <div>
      {children}
      <ErrorMessage error={error} />
    </div>
  );
};
