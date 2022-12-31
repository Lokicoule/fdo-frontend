import { QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, Suspense } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { Box, Link, Typography } from "@mui/material";
import { ErrorBoundary } from "react-error-boundary";

import { Loader } from "~/components/Elements/Loader";
import { AuthProvider } from "~/libs/auth";
import { queryClient } from "~/libs/react-query";
import { ThemeProvider } from "./theme";

//TODO : check when api is down
const ErrorFallback = () => {
  const location = useLocation();

  const origin = location.state?.from?.pathname ?? "/home";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          fontSize: "10rem",
          fontWeight: "bold",
          color: "primary.main",
        }}
      >
        500
      </Typography>
      <Typography
        sx={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "primary.main",
        }}
      >
        Oops something went wrong
      </Typography>
      <Link
        sx={{ mt: 6, fontSize: "1.5rem", fontWeight: "bold" }}
        href={origin}
      >
        Go back
      </Link>
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
