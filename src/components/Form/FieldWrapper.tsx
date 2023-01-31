import { Alert, TextFieldProps } from "@mui/material";
import { FieldError } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Override } from "~/types";
import { ValidationError } from "~/types/ValidationError";

type FieldErrorType =
  | FieldError
  | Override<FieldError, { message: ValidationError }>;

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
    return (
      <Alert severity="error" sx={{ mt: 1 }}>
        <>{t(error.message, { defaultValue: error.message })}</>
      </Alert>
    );
  } else {
    const { key, values } = error.message;
    return (
      <Alert severity="error" sx={{ mt: 1 }}>
        <>
          {t(key, {
            ...values,
            defaultValue: key,
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
