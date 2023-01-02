import { Button, Grid, Link } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import { RegisterConfirmationForm } from "../components/RegisterConfirmationForm";
import { LOGIN_PATH } from "./Login";

export const REGISTER_CONFIRMATION_PATH = "/register-confirmation";

export const RegisterConfirmation: React.FunctionComponent = () => {
  const { t } = useTranslation(["auth"]);
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate(LOGIN_PATH);
  };

  return (
    <Layout
      title={t("register-confirmation.title")}
      description={t("register-confirmation.description")}
    >
      <RegisterConfirmationForm onSuccess={handleSuccess} />
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
