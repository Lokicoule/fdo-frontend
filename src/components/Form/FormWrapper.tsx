import { Alert } from "@mui/material";

type FormWrapperProps = {
  error?: Error | null;
};

const ErrorMessage: React.FunctionComponent<FormWrapperProps> = (props) => {
  const { error } = props;

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
