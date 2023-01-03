import { Alert } from "@mui/material";
import { useTranslation } from "react-i18next";

type FormWrapperProps = {
  error?: Error;
};

const ErrorMessage: React.FunctionComponent<FormWrapperProps> = (props) => {
  const { error } = props;
  const { t } = useTranslation();

  if (!error) {
    return null;
  } else {
    return (
      <Alert severity="error" sx={{ mt: 1 }}>
        {error.message}
      </Alert>
    );
  }
};

export const FormWrapper: React.FunctionComponent<
  React.PropsWithChildren<FormWrapperProps>
> = (props) => {
  const { children, error } = props;

  return (
    <div>
      {children}
      <ErrorMessage error={error} />
    </div>
  );
};
