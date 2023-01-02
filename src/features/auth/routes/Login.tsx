import { Button, Grid, Link, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

import { FORGOT_PASSWORD_PATH } from "./ForgotPassword";
import { REGISTER_PATH } from "./Register";

import { Layout } from "../components/Layout";
import { LoginForm } from "../components/LoginForm";

export const LOGIN_PATH = "/login";

export const Login: React.FunctionComponent = () => {
  const { t } = useTranslation(["auth"]);
  const navigate = useNavigate();
  const location = useLocation();

  const origin = location.state?.from?.pathname ?? "/app";

  const handleSuccess = () => {
    navigate(origin);
  };

  return (
    <Layout title={t("login.title")} description={t("login.description")}>
      <LoginForm onSuccess={handleSuccess} />
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ mt: 1, width: "100%" }}
      >
        <Button
          sx={{
            textTransform: "none",
          }}
          href={FORGOT_PASSWORD_PATH}
          color="secondary"
        >
          {t("forgot_password.display_name")}
        </Button>
        <Button
          sx={{
            textTransform: "none",
          }}
          href={REGISTER_PATH}
        >
          {t("register.display_name")}
        </Button>
      </Stack>
    </Layout>
  );
};
