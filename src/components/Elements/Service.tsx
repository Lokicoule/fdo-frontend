import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

export const Service: React.FunctionComponent<React.PropsWithChildren> = (
  props
) => {
  const { children } = props;

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          fallbackRender={({ error, resetErrorBoundary }) => (
            <Box mt={2}>
              <Alert severity="error">
                <AlertTitle>
                  <strong>Error</strong>
                </AlertTitle>
                Service is not available. Please try again later.
              </Alert>

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
          )}
          onReset={reset}
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};
