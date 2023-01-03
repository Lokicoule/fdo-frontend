import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { LOGIN_PATH } from "./Login";
import { REGISTER_CONFIRMATION_PATH } from "./RegisterConfirmation";

import { Layout } from "../components/Layout";
import { RegisterForm } from "../components/RegisterForm";

export const REGISTER_PATH = "/register";

export const Register: React.FunctionComponent = () => {
  const { t } = useTranslation(["auth"]);
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate(REGISTER_CONFIRMATION_PATH);
  };

  return (
    <Layout
      title={t("auth:@register.title")}
      description={t("auth:@register.description")}
    >
      <RegisterForm onSuccess={handleSuccess} />
      <Button
        sx={{
          textTransform: "none",
          mt: 2,
          alignSelf: "flex-end",
        }}
        href={LOGIN_PATH}
      >
        {t("auth:@login.displayName")}
      </Button>
    </Layout>
  );
};
