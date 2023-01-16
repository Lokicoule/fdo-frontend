import { Box, Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Button from "@mui/material/Button";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { useTranslation } from "react-i18next";
import { BaseException } from "~/libs/graphql-client";

export type QueryWrapperProps = {
  title?: React.ReactNode;
  errorFallback?: {
    title: React.ReactNode;
  };
};

const ErrorMessage: React.FunctionComponent<{
  error?: Error;
}> = (props) => {
  const { error } = props;
  const { t } = useTranslation();
  if (error instanceof BaseException) {
    if (!error?.code) {
      return null;
    } else {
      console.log("error", error);
      return (
        <Alert severity="error" sx={{ mt: 1 }}>
          <>
            <AlertTitle>
              <strong>Error</strong>
            </AlertTitle>
            {t(`error.${error.code}`, { defaultValue: error.code })}
          </>
        </Alert>
      );
    }
  }

  return (
    <Alert severity="error" sx={{ mt: 1 }}>
      <>
        <AlertTitle>
          <strong>Error</strong>
        </AlertTitle>
        {t("error.UNKNOWN", { defaultValue: "Unknown error" })}
      </>
    </Alert>
  );
};

export const QueryWrapper: React.FunctionComponent<
  React.PropsWithChildren<QueryWrapperProps>
> = (props) => {
  const { children, title, errorFallback } = props;

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          fallbackRender={({ error, resetErrorBoundary }) => (
            <>
              {errorFallback?.title ? (
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {errorFallback.title}
                </Typography>
              ) : null}
              <Box mt={2}>
                <ErrorMessage error={error} />

                <Box mt={2}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={resetErrorBoundary}
                  >
                    Try again
                  </Button>
                </Box>
              </Box>
            </>
          )}
          onReset={reset}
        >
          {title ? (
            <Typography variant="h6" sx={{ mb: 2 }}>
              {title}
            </Typography>
          ) : null}
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};
