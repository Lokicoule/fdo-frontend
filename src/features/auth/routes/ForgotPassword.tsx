import { Button, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ForgotPasswordForm } from "../components/ForgotPasswordForm";
import { Layout } from "../components/Layout";
import { FORGOT_PASSWORD_CONFIRMATION_PATH } from "./ForgotPasswordConfirmation";

import { LOGIN_PATH } from "./Login";
import { REGISTER_PATH } from "./Register";

export const FORGOT_PASSWORD_PATH = "/forgot-password";

export const ForgotPassword: React.FunctionComponent = () => {
  const { t } = useTranslation(["auth"]);
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate(FORGOT_PASSWORD_CONFIRMATION_PATH);
  };

  return (
    <Layout
      title={t("auth:@forgotPassword.title")}
      description={t("auth:@forgotPassword.description")}
    >
      <ForgotPasswordForm onSuccess={handleSuccess} />
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ mt: 1, width: "100%" }}
      >
        <Button
          sx={{
            textTransform: "none",
          }}
          href={REGISTER_PATH}
          color="secondary"
        >
          {t("auth:@register.displayName")}
        </Button>
        <Button
          sx={{
            textTransform: "none",
          }}
          href={LOGIN_PATH}
        >
          {t("auth:@login.displayName")}
        </Button>
      </Stack>
    </Layout>
  );
};
