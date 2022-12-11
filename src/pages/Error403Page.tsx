import Box from "@mui/material/Box";

const ErrorPage = (props: { title: string; description: string }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          fontSize: "10rem",
          fontWeight: "bold",
          color: "primary.main",
        }}
      >
        {props.title}
      </Box>
      <Box
        sx={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "primary.main",
        }}
      >
        {props.description}
      </Box>
    </Box>
  );
};

export const Error403Page: React.FunctionComponent = () => {
  return (
    <ErrorPage
      title="403"
      description="Sorry, you are not authorized to access this page."
    />
  );
};
