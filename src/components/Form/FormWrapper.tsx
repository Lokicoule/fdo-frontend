import { Alert } from "@mui/material";
import { preventRenderingIf } from "~/utils/render";

type FormWrapperProps = {
  error?: Error | null;
  warn?: string | null;
};

const ErrorMessage: React.FunctionComponent<Pick<FormWrapperProps, "error">> = (
  props
) => {
  const { error } = props;

  return (
    <>
      {preventRenderingIf(error).render(
        <Alert severity="error" sx={{ mt: 1 }}>
          {error?.message}
        </Alert>
      )}
    </>
  );
};

const WarnMessage: React.FunctionComponent<Pick<FormWrapperProps, "warn">> = (
  props
) => {
  const { warn } = props;

  return (
    <>
      {preventRenderingIf(warn).render(
        <Alert severity="warning" sx={{ mt: 1 }}>
          {warn}
        </Alert>
      )}
    </>
  );
};

export const FormWrapper: React.FunctionComponent<
  React.PropsWithChildren<FormWrapperProps>
> = (props) => {
  const { children, error, warn } = props;

  return (
    <div>
      {children}
      <WarnMessage warn={warn} />
      <ErrorMessage error={error} />
    </div>
  );
};
