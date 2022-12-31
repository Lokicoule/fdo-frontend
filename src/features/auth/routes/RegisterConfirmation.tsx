import { Grid, Link } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import { RegisterConfirmationForm } from "../components/RegisterConfirmationForm";
import { LOGIN_PATH } from "./Login";

export const REGISTER_CONFIRMATION_PATH = "/register-confirmation";

export const RegisterConfirmation: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate(LOGIN_PATH);
  };

  return (
    <Layout title={t("register-confirmation.title")}>
      <RegisterConfirmationForm onSuccess={handleSuccess} />
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link href={LOGIN_PATH} variant="body2">
            {t("register-confirmation.actions.already_have_account")}
          </Link>
        </Grid>
      </Grid>
    </Layout>
  );
};
