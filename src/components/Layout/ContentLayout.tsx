import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Button from "@mui/material/Button";
import Paper, { PaperProps } from "@mui/material/Paper";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

type ServiceFallbackProps = {
  title?: React.ReactNode;
  fallback?: {
    title: React.ReactNode;
  };
};

type LocationNavigationProps = {
  locations?: {
    name: string;
    path?: string;
  }[];
};

export type ContentLayoutProps = React.PropsWithChildren<
  LocationNavigationProps & {
    elevation?: PaperProps["elevation"];
  } & ServiceFallbackProps
>;

export const Service: React.FunctionComponent<
  React.PropsWithChildren<ServiceFallbackProps>
> = (props) => {
  const { children, title, fallback } = props;

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          fallbackRender={({ error, resetErrorBoundary }) => (
            <>
              {fallback?.title ? (
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {fallback.title}
                </Typography>
              ) : null}
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

const LocationNavigation = (props: LocationNavigationProps) => {
  const { locations } = props;

  if (!locations) {
    return null;
  }

  return (
    <Breadcrumbs
      sx={{
        mb: 2,
      }}
    >
      {locations.map((location, index) => {
        const { name, path } = location;

        if (index < locations.length - 1) {
          if (path) {
            return (
              <Link key={index} href={path}>
                {name}
              </Link>
            );
          }
        }
        return (
          <Typography
            sx={{
              fontWeight: index === locations.length - 1 ? "bold" : "inherit",
            }}
            key={index}
          >
            {name}
          </Typography>
        );
      })}
    </Breadcrumbs>
  );
};

export const ContentLayout: React.FunctionComponent<ContentLayoutProps> = (
  props
) => {
  const { children, elevation = 1, locations, ...others } = props;

  return (
    <>
      <LocationNavigation locations={locations} />
      <Box
        component={Paper}
        sx={{
          padding: "1.5rem",
          display: "flex",
          flexDirection: "column",
        }}
        elevation={elevation}
      >
        <Service {...others}>{children}</Service>
      </Box>
    </>
  );
};
