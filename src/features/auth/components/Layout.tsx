import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Stack } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { LanguageSelector } from "../../../components/Elements/LanguageSelector";

type LayoutProps = React.PropsWithChildren<{
  description: string;
  title: string;
}>;

export const Layout: React.FunctionComponent<LayoutProps> = (props) => {
  const { children, description, title } = props;

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
        flexDirection: "column",
      }}
    >
      <Paper
        sx={{
          p: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
        elevation={1}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {title}
        </Typography>
        <Typography component="h2" variant="subtitle1">
          {description}
        </Typography>
        {children}
      </Paper>
      <LanguageSelector
        sx={{
          alignSelf: "flex-start",
          bottom: 0,
          right: 0,
          ml: 2,
          mt: 10,
          boxShadow: "none",
          ".MuiOutlinedInput-notchedOutline": { border: 0 },
        }}
      />
    </Container>
  );
};
