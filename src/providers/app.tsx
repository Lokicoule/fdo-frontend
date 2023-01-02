import { QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, Suspense } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { ErrorBoundary } from "react-error-boundary";

import { Loader } from "~/components/Elements/Loader";
import { AuthProvider } from "~/libs/auth";
import { queryClient } from "~/libs/react-query";
import { ThemeProvider } from "./theme";

//TODO : check when api is down
const ErrorFallback = () => {
  const handleClick = () => {
    window.location.reload();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
      }}
    >
      <Typography
        sx={{
          fontSize: "10rem",
          fontWeight: "bold",
          color: "primary.dark",
        }}
      >
        500
      </Typography>
      <Typography
        sx={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "primary.light",
        }}
      >
        Oops something went wrong
      </Typography>
      <Button
        sx={{ mt: 10 }}
        variant="contained"
        color="secondary"
        onClick={handleClick}
      >
        Go back
      </Button>
    </Box>
  );
};

export const AppProvider: React.FunctionComponent<PropsWithChildren> = (
  props
) => {
  const { children } = props;

  return (
    <Suspense fallback={<Loader />}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Router>
              <ThemeProvider>{children}</ThemeProvider>
            </Router>
          </AuthProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </Suspense>
  );
};
