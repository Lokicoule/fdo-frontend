import Paper from "@mui/material/Paper";

type ContentLayoutProps = React.PropsWithChildren<{}>;

export const ContentLayout: React.FunctionComponent<ContentLayoutProps> = (
  props
) => {
  const { children } = props;

  return (
    <Paper
      sx={{
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
      elevation={1}
    >
      {children}
    </Paper>
  );
};
