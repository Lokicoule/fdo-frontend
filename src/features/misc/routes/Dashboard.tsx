import { Box, Typography } from "@mui/material";
import { ContentLayout } from "~/components/Layout/ContentLayout";

type DashboardProps = {};

export const Dashboard: React.FunctionComponent<DashboardProps> = (props) => {
  return (
    <ContentLayout
      title="Dashboard"
      fallback={{
        title: "Dashboard",
      }}
      locations={[
        {
          name: "Dashboard",
        },
      ]}
    ></ContentLayout>
  );
};
