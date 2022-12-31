import { Grid, Link } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { LOGIN_PATH } from "./Login";
import { REGISTER_CONFIRMATION_PATH } from "./RegisterConfirmation";

import { RegisterForm } from "../components/RegisterForm";
import { Layout } from "../components/Layout";

export const REGISTER_PATH = "/register";

export const Register: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate(REGISTER_CONFIRMATION_PATH);
  };

  return (
    <Layout title={t("register.title")}>
      <RegisterForm onSuccess={handleSuccess} />
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link
            sx={{
              textDecoration: "none",
              ":hover": {
                textDecoration: "underline",
              },
            }}
            href={LOGIN_PATH}
            variant="body2"
          >
            {`${t("register.actions.already_have_account")}`}
          </Link>
        </Grid>
      </Grid>
    </Layout>
  );
};
