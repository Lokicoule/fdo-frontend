import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Box } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { PublicLayout } from "~/components/Layout/PublicLayout";

type LayoutProps = React.PropsWithChildren<{
  title: string;
}>;

export const Layout: React.FunctionComponent<LayoutProps> = (props) => {
  const { children, title } = props;

  return (
    <PublicLayout>
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <Paper
          sx={{
            p: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          elevation={5}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {title}
          </Typography>
          {children}
        </Paper>
      </Container>
    </PublicLayout>
  );
};
