import { Link, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";

type PageErrorProps = {
  title: string;
  description: string;
};

export const PageErrorTemplate: React.FunctionComponent<PageErrorProps> = (
  props
) => {
  const { description, title } = props;

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
      <Link
        sx={{ mt: 6, fontSize: "1.5rem", fontWeight: "bold" }}
        href={origin}
      >
        Go back
      </Link>
    </Box>
  );
};
