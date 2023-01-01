import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
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
      <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        {title}
      </Typography>
      {children}
    </PublicLayout>
  );
};
