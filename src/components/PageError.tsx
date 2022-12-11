import { Link, Typography } from "@mui/material";
import Box from "@mui/material/Box";

type PageErrorProps = {
  title: string;
  description: string;
  redirect: {
    to: string;
    label: string;
  };
};

export const PageError: React.FunctionComponent<PageErrorProps> = (props) => {
  const { description, title, redirect } = props;

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
        {title}
      </Typography>
      <Typography
        sx={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "primary.main",
        }}
      >
        {description}
      </Typography>
      {redirect && (
        <Link
          sx={{ mt: 6, fontSize: "1.5rem", fontWeight: "bold" }}
          href={redirect.to}
        >
          {redirect.label}
        </Link>
      )}
    </Box>
  );
};
