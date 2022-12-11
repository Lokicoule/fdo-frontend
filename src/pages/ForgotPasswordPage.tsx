import { ForgotPasswordContent, PreventAuth } from "~/features/authentication";

export const ForgotPasswordPage = () => {
  return (
    <PreventAuth redirectTo="/home">
      <ForgotPasswordContent />
    </PreventAuth>
  );
};
