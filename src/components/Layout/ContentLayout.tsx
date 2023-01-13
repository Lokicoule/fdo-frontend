import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import Paper, { PaperProps } from "@mui/material/Paper";
import { Service } from "../Elements/Service";

type LocationNavigationProps = {
  locations?: {
    name: string;
    path?: string;
  }[];
};

export type ContentLayoutProps = React.PropsWithChildren<
  LocationNavigationProps & {
    elevation?: PaperProps["elevation"];
    title?: React.ReactElement | string;
  }
>;

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
  const { children, elevation = 1, title, locations } = props;

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
        <Typography variant="h5" sx={{ mb: 2 }}>
          {title}
        </Typography>
        <Service>{children}</Service>
      </Box>
    </>
  );
};
