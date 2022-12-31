import { Grid, Link } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { FORGOT_PASSWORD_PATH } from "./ForgotPassword";
import { REGISTER_PATH } from "./Register";

import { Layout } from "../components/Layout";
import { LoginForm } from "../components/LoginForm";

export const LOGIN_PATH = "/login";

export const Login: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate("/app");
  };

  return (
    <Layout title={t("auth:login.title")}>
      <LoginForm onSuccess={handleSuccess} />
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{
            mt: 1,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Link
            sx={{
              textDecoration: "none",
              ":hover": {
                textDecoration: "underline",
              },
            }}
            href={REGISTER_PATH}
            variant="body2"
          >
            {t("auth:login.actions.no_account")}
          </Link>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            mt: 1,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Link
            sx={{
              textDecoration: "none",
              ":hover": {
                textDecoration: "underline",
              },
            }}
            href={FORGOT_PASSWORD_PATH}
            variant="body2"
          >
            {t("auth:login.actions.forgot_password")}
          </Link>
        </Grid>
      </Grid>
    </Layout>
  );
};
