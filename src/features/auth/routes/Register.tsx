import { Button, Grid, Link } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { LOGIN_PATH } from "./Login";
import { REGISTER_CONFIRMATION_PATH } from "./RegisterConfirmation";

import { RegisterForm } from "../components/RegisterForm";
import { Layout } from "../components/Layout";

export const REGISTER_PATH = "/register";

export const Register: React.FunctionComponent = () => {
  const { t } = useTranslation(["auth"]);
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate(REGISTER_CONFIRMATION_PATH);
  };

  return (
    <Layout title={t("register.title")} description={t("register.description")}>
      <RegisterForm onSuccess={handleSuccess} />
      <Button
        sx={{
          textTransform: "none",
          mt: 2,
          alignSelf: "flex-end",
        }}
        href={LOGIN_PATH}
      >
        {t("login.display_name")}
      </Button>
    </Layout>
  );
};
