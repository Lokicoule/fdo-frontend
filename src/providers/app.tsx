import { Box, Button, Typography } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter as Router } from "react-router-dom";

import { Loader } from "~/components/Elements/Loader";
import { Notifications } from "~/components/Notifications/Notifications";
import queryClient from "~/libs/react-query";
import { AuthProvider } from "./auth";
import { ThemeProvider } from "./theme";

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
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <Notifications />
        <AuthProvider>
          <Router>
            <ThemeProvider>{children}</ThemeProvider>
          </Router>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};
