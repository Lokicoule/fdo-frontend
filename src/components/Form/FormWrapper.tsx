import { Alert } from "@mui/material";
import { useTranslation } from "react-i18next";
import { UseCaseException } from "~/libs/graphql-client";
import { preventRenderingIf } from "~/utils/render";

type FormWrapperProps = {
  error?: Error | null;
  warn?: string | null;
  namespace?: string;
};

/**
 * Only use case exceptions are translated here.
 * Other errors are not translated because they are not supposed to be shown to the user.
 */
const ErrorMessage: React.FunctionComponent<
  Pick<FormWrapperProps, "error" | "namespace">
> = (props) => {
  const { error, namespace = "common" } = props;
  const { t } = useTranslation();

  return (
    <>
      {preventRenderingIf(error).render(
        <Alert severity="error" sx={{ mt: 1 }}>
          <>
            {error instanceof UseCaseException ? (
              <>
                {t(`${namespace}:error.${error.message}`, {
                  defaultValue: error.message,
                })}
              </>
            ) : (
              <>{t("error.UNKNOWN", { defaultValue: "Unknown error" })}</>
            )}
          </>
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
  const { children, error, warn, namespace } = props;

  return (
    <div>
      {children}
      <WarnMessage warn={warn} />
      <ErrorMessage error={error} namespace={namespace} />
    </div>
  );
};
